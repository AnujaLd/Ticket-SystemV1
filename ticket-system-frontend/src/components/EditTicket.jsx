import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Container,
  Stack,
  Chip,
  Fade,
  Zoom,
  Grid,
  Skeleton,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Cancel as CancelIcon,
  ErrorOutline as ErrorIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  PriorityHigh as PriorityIcon,
  AssignmentTurnedIn as StatusIcon,
  Save as SaveIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { getTicket, updateTicket } from '../services/api';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    issue_description: '',
    priority: 'medium',
    status: 'open'
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicket(id);
        setFormData(data.ticket);
        setLoading(false);
      } catch (err) {
        setErrors({ general: 'Failed to load ticket data' });
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'Customer name is required';
    } else if (formData.customer_name.length > 255) {
      newErrors.customer_name = 'Customer name cannot exceed 255 characters';
    }
    
    if (!formData.issue_description.trim()) {
      newErrors.issue_description = 'Issue description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setUpdating(true);
    try {
      await updateTicket(id, formData);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Failed to update ticket. Please try again.' });
      }
      setUpdating(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'info';
      case 'closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return '📋';
      case 'closed':
        return '✅';
      default:
        return '📝';
    }
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box>
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 4,
            mb: 4,
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Skeleton variant="circular" width={48} height={48} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.2)' }} />
        </Paper>
        
        <Card elevation={8} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 5 }}>
            <LinearProgress sx={{ mb: 3, borderRadius: 2 }} />
            <Stack spacing={4}>
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 2 }} />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              p: 4,
              mb: 4,
              borderRadius: 3,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.5
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <EditIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Edit Ticket #{id}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Update ticket information and status
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <Chip
                  icon={<span>{getPriorityIcon(formData.priority)}</span>}
                  label={`${formData.priority.toUpperCase()} PRIORITY`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                <Chip
                  icon={<span>{getStatusIcon(formData.status)}</span>}
                  label={formData.status.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              </Stack>
            </Box>
          </Paper>

          {/* Main Form Card */}
          <Zoom in timeout={1000}>
            <Card
              elevation={8}
              sx={{
                borderRadius: 4,
                overflow: 'visible',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              <CardContent sx={{ p: 5 }}>
                {/* Progress Bar for Update */}
                {updating && (
                  <Box sx={{ mb: 3 }}>
                    <LinearProgress
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(45deg, #f093fb 30%, #f5576c 90%)',
                          borderRadius: 3
                        }
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                      Updating ticket...
                    </Typography>
                  </Box>
                )}

                {/* Error Alert */}
                {errors.general && (
                  <Fade in>
                    <Alert
                      severity="error"
                      icon={<ErrorIcon />}
                      sx={{
                        mb: 4,
                        borderRadius: 2,
                        '& .MuiAlert-icon': {
                          fontSize: '1.5rem'
                        }
                      }}
                    >
                      {errors.general}
                    </Alert>
                  </Fade>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    {/* Customer Name Field */}
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <PersonIcon color="primary" />
                        <Typography variant="h6" color="text.primary">
                          Customer Information
                        </Typography>
                      </Stack>
                      <TextField
                        fullWidth
                        name="customer_name"
                        label="Customer Name"
                        variant="outlined"
                        value={formData.customer_name}
                        onChange={handleChange}
                        error={!!errors.customer_name}
                        helperText={errors.customer_name}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                              }
                            }
                          }
                        }}
                        InputProps={{
                          sx: { fontSize: '1.1rem' }
                        }}
                      />
                    </Box>

                    {/* Issue Description Field */}
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <DescriptionIcon color="primary" />
                        <Typography variant="h6" color="text.primary">
                          Issue Details
                        </Typography>
                      </Stack>
                      <TextField
                        fullWidth
                        name="issue_description"
                        label="Issue Description"
                        variant="outlined"
                        multiline
                        rows={5}
                        value={formData.issue_description}
                        onChange={handleChange}
                        error={!!errors.issue_description}
                        helperText={errors.issue_description || 'Provide detailed information about the issue'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                              }
                            }
                          }
                        }}
                        InputProps={{
                          sx: { fontSize: '1.1rem' }
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Ticket Management
                      </Typography>
                    </Divider>

                    {/* Priority and Status Fields */}
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                          <PriorityIcon color="primary" />
                          <Typography variant="h6" color="text.primary">
                            Priority Level
                          </Typography>
                          <Chip
                            label={`${getPriorityIcon(formData.priority)} ${formData.priority.toUpperCase()}`}
                            color={getPriorityColor(formData.priority)}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                        <FormControl fullWidth>
                          <InputLabel>Priority</InputLabel>
                          <Select
                            name="priority"
                            value={formData.priority}
                            label="Priority"
                            onChange={handleChange}
                            sx={{
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                }
                              }
                            }}
                          >
                            <MenuItem value="low">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <span>🟢</span>
                                <span>Low Priority</span>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="medium">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <span>🟡</span>
                                <span>Medium Priority</span>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="high">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <span>🔴</span>
                                <span>High Priority</span>
                              </Stack>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                          <StatusIcon color="primary" />
                          <Typography variant="h6" color="text.primary">
                            Status
                          </Typography>
                          <Chip
                            label={`${getStatusIcon(formData.status)} ${formData.status.toUpperCase()}`}
                            color={getStatusColor(formData.status)}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            name="status"
                            value={formData.status}
                            label="Status"
                            onChange={handleChange}
                            sx={{
                              borderRadius: 2,
                              '&:hover': {
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'primary.main',
                                }
                              }
                            }}
                          >
                            <MenuItem value="open">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <ScheduleIcon color="info" />
                                <span>Open</span>
                              </Stack>
                            </MenuItem>
                            <MenuItem value="closed">
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <CheckIcon color="success" />
                                <span>Closed</span>
                              </Stack>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ pt: 3 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => navigate('/')}
                          sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderWidth: 2,
                            '&:hover': {
                              borderWidth: 2,
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={updating ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                          disabled={updating}
                          sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #f093fb 30%, #f5576c 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #e085f5 30%, #e04a5f 90%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 12px 24px rgba(240, 147, 251, 0.4)'
                            },
                            '&:disabled': {
                              background: 'linear-gradient(45deg, #ccc 30%, #999 90%)',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {updating ? 'Updating Ticket...' : 'Update Ticket'}
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Zoom>
        </Box>
      </Fade>
    </Container>
  );
};

export default EditTicket;