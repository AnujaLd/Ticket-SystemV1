import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
  Toolbar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { getTickets, deleteTicket } from '../services/api';

// Configuration object to avoid hardcoding
const CONFIG = {
  SORT_FIELDS: {
    CUSTOMER_NAME: 'customer_name',
    PRIORITY: 'priority',
    STATUS: 'status',
    CREATED_AT: 'created_at',
  },
  SORT_DIRECTIONS: {
    ASC: 'asc',
    DESC: 'desc',
  },
  STATUSES: {
    OPEN: 'open',
    CLOSED: 'closed',
  },
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  },
  COLORS: {
    PRIORITY: {
      high: { bgcolor: '#ffebee', color: '#c62828' },
      medium: { bgcolor: '#fff8e1', color: '#f57f17' },
      low: { bgcolor: '#e8f5e8', color: '#2e7d32' },
    },
    STATUS: {
      open: { bgcolor: '#e3f2fd', color: '#1565c0' },
      closed: { bgcolor: '#f5f5f5', color: '#616161' },
    },
  },
};

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    sort_by: CONFIG.SORT_FIELDS.CREATED_AT,
    sort_direction: CONFIG.SORT_DIRECTIONS.DESC,
  });

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getTickets(filters);
      setTickets(data.tickets);
      setStats(data.stats);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSortChange = (field) => {
    setFilters(prev => ({
      ...prev,
      sort_by: field,
      sort_direction:
        prev.sort_by === field && prev.sort_direction === CONFIG.SORT_DIRECTIONS.ASC
          ? CONFIG.SORT_DIRECTIONS.DESC
          : CONFIG.SORT_DIRECTIONS.ASC,
    }));
  };

  const handleDeleteClick = (ticket) => {
    setTicketToDelete(ticket);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (ticketToDelete) {
      try {
        await deleteTicket(ticketToDelete.id);
        await fetchTickets();
        setError(null);
      } catch (err) {
        setError('Failed to delete ticket. Please try again.');
      } finally {
        setDeleteDialogOpen(false);
        setTicketToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTicketToDelete(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityChipProps = (priority) => {
    const colors = CONFIG.COLORS.PRIORITY[priority] || CONFIG.COLORS.PRIORITY.low;
    return {
      label: priority.charAt(0).toUpperCase() + priority.slice(1),
      size: 'small',
      sx: {
        backgroundColor: colors.bgcolor,
        color: colors.color,
        fontWeight: 'bold',
      },
    };
  };

  const getStatusChipProps = (status) => {
    const colors = CONFIG.COLORS.STATUS[status] || CONFIG.COLORS.STATUS.closed;
    return {
      label: status.charAt(0).toUpperCase() + status.slice(1),
      size: 'small',
      sx: {
        backgroundColor: colors.bgcolor,
        color: colors.color,
        fontWeight: 'bold',
      },
    };
  };

  const StatsCard = ({ title, value, color = 'text.primary' }) => (
    <Card elevation={2}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom variant="body2">
          {title}
        </Typography>
        <Typography variant="h4" component="div" color={color} fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading && tickets.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
      Support Tickets
    </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatsCard title="Total Tickets" value={stats.total} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard 
            title="Open Tickets" 
            value={stats.open} 
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard 
            title="Closed Tickets" 
            value={stats.closed} 
            color="text.secondary"
          />
        </Grid>
      </Grid>

      {/* Filters Card */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Toolbar disableGutters>
            <FilterIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Filters & Search
            </Typography>
          </Toolbar>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={filters.status}
                  label="Status Filter"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value="">All Tickets</MenuItem>
                  <MenuItem value={CONFIG.STATUSES.OPEN}>Open</MenuItem>
                  <MenuItem value={CONFIG.STATUSES.CLOSED}>Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Search Tickets"
                placeholder="Search by customer name or issue description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Tickets Table */}
      <Card elevation={2}>
        <TableContainer component={Paper}>
          {tickets.length > 0 ? (
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>
                    <TableSortLabel
                      active={filters.sort_by === CONFIG.SORT_FIELDS.CUSTOMER_NAME}
                      direction={
                        filters.sort_by === CONFIG.SORT_FIELDS.CUSTOMER_NAME
                          ? filters.sort_direction
                          : CONFIG.SORT_DIRECTIONS.ASC
                      }
                      onClick={() => handleSortChange(CONFIG.SORT_FIELDS.CUSTOMER_NAME)}
                    >
                      Customer Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Issue Description</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={filters.sort_by === CONFIG.SORT_FIELDS.PRIORITY}
                      direction={
                        filters.sort_by === CONFIG.SORT_FIELDS.PRIORITY
                          ? filters.sort_direction
                          : CONFIG.SORT_DIRECTIONS.ASC
                      }
                      onClick={() => handleSortChange(CONFIG.SORT_FIELDS.PRIORITY)}
                    >
                      Priority
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={filters.sort_by === CONFIG.SORT_FIELDS.STATUS}
                      direction={
                        filters.sort_by === CONFIG.SORT_FIELDS.STATUS
                          ? filters.sort_direction
                          : CONFIG.SORT_DIRECTIONS.ASC
                      }
                      onClick={() => handleSortChange(CONFIG.SORT_FIELDS.STATUS)}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={filters.sort_by === CONFIG.SORT_FIELDS.CREATED_AT}
                      direction={
                        filters.sort_by === CONFIG.SORT_FIELDS.CREATED_AT
                          ? filters.sort_direction
                          : CONFIG.SORT_DIRECTIONS.ASC
                      }
                      onClick={() => handleSortChange(CONFIG.SORT_FIELDS.CREATED_AT)}
                    >
                      Date Created
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {ticket.customer_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300 }}>
                        {ticket.issue_description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip {...getPriorityChipProps(ticket.priority)} />
                    </TableCell>
                    <TableCell>
                      <Chip {...getStatusChipProps(ticket.status)} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(ticket.created_at)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Updated: {formatDateTime(ticket.updated_at)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit ticket">
                        <IconButton
                          component={Link}
                          to={`/edit/${ticket.id}`}
                          color="primary"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete ticket">
                        <IconButton
                          onClick={() => handleDeleteClick(ticket)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box p={4} textAlign="center">
              <Typography variant="h6" color="text.secondary">
                No tickets found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or filters
              </Typography>
            </Box>
          )}
        </TableContainer>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the ticket for{' '}
            <strong>{ticketToDelete?.customer_name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TicketList;