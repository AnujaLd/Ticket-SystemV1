import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Zoom
} from '@mui/material';
import {
  Create as CreateIcon,
  Cancel as CancelIcon,
  ErrorOutline as ErrorIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  PriorityHigh as PriorityIcon
} from '@mui/icons-material';
import { createTicket } from '../services/api';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    issue_description: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    
    setLoading(true);
    try {
      await createTicket(formData);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Failed to create ticket. Please try again.' });
      }
      setLoading(false);
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
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
            <CreateIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              Create New Ticket
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Submit your support request and we'll get back to you soon
            </Typography>
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
                        label="Describe your issue"
                        variant="outlined"
                        multiline
                        rows={5}
                        value={formData.issue_description}
                        onChange={handleChange}
                        error={!!errors.issue_description}
                        helperText={errors.issue_description || 'Please provide as much detail as possible'}
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

                    {/* Priority Field */}
                    <Box>
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
                    </Box>

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
                          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CreateIcon />}
                          disabled={loading}
                          sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 12px 24px rgba(102, 126, 234, 0.4)'
                            },
                            '&:disabled': {
                              background: 'linear-gradient(45deg, #ccc 30%, #999 90%)',
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {loading ? 'Creating Ticket...' : 'Create Ticket'}
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

export default CreateTicket;