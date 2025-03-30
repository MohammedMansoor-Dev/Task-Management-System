import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin-dashboard/', { withCredentials: true });
        setAllTasks(response.data.allTasks);  // Update state with the fetched data
        console.log(response)
        setAllUsers(response.data.allUsers);
      } catch (error) {
        console.error('Error fetching tasks:', error);  // Handle any errors
      }
    };
    
    fetchData();  // Call the async function
  }, []);  // Empty dependency array means it runs once when the component mounts

  const totalTasks = allTasks.length;
  const totalUsers = allUsers.length;
  const completedTasks = allTasks.filter(task => task.taskStatus === 'Completed').length;
  const pendingTasks = allTasks.filter(task => task.taskStatus === 'Incomplete').length;

  // Task Overview Chart Data
  const taskData = [
    { name: 'Completed', count: completedTasks },
    { name: 'Pending', count: pendingTasks },
  ];

  // To generate monthly performance data, we need to format the dates
  const performanceData = [];
  allTasks.forEach(task => {
    const taskMonth = new Date(task.taskDate).toLocaleString('default', { month: 'long' });
    const existingMonthData = performanceData.find(item => item.name === taskMonth);

    if (existingMonthData) {
      if (task.taskStatus === 'Completed') {
        existingMonthData.completed += 1;
      } else {
        existingMonthData.incomplete += 1;
      }
      existingMonthData.total += 1;
    } else {
      performanceData.push({
        name: taskMonth,
        total: 1,
        completed: task.taskStatus === 'Completed' ? 1 : 0,
        incomplete: task.taskStatus === 'Incomplete' ? 1 : 0,
      });
    }
  });

  return (
    <div className="bg-gray-900 min-h-[90vh]">
      <Box sx={{ padding: 4, backgroundColor: '#111828', minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Admin Dashboard
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* Task Overview Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#1E2938' }}>
              <CardContent className="text-center">
                <Typography variant="h6" gutterBottom color="primary">
                  <span className='text-2xl'>Total Tasks</span>
                </Typography>
                <Typography variant="h6" color="text.primary">
                  <span style={{ fontWeight: 'bold', color: '#fff' }} className='text-4xl'>{totalTasks}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#1E2938' }}>
              <CardContent className="text-center">
                <Typography variant="h6" gutterBottom color="primary">
                  <span className='text-2xl'>Completed</span>
                </Typography>
                <Typography variant="h6" color="text.primary">
                  <span style={{ fontWeight: 'bold', color: '#4caf50' }} className='text-4xl'>{completedTasks}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#1E2938' }}>
              <CardContent className="text-center">
                <Typography variant="h6" gutterBottom color="primary">
                  <span className='text-2xl'>Pending</span>
                </Typography>
                <Typography variant="h6" color="text.primary">
                  <span style={{ fontWeight: 'bold', color: '#f44336' }} className='text-4xl'>{pendingTasks}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* User Overview Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#1E2938' }} className='text-center'>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  <span className='text-2xl'>User Overview</span>
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  <span className='text-white text-2xl'>Total Users:</span> <span style={{ fontWeight: 'bold' }} className='text-4xl text-white'>{totalUsers}</span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Statistics Section */}
        <Box sx={{ marginTop: 4 }}>
          <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 2, backgroundColor: '#1E2938' }}>
            <Typography variant="h5" color="primary" gutterBottom align="center">
              Performance Statistics
            </Typography>
            <Grid container spacing={3} marginLeft={2}>
              {/* Task Overview Bar Chart */}
              <Grid item xs={12} sm={6} md={6} lg={5.5}>
                <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#111828' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      Task Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={taskData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#4caf50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Performance Stats Bar Chart */}
              <Grid item xs={12} sm={6} md={6} lg={5.5}>
                <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#111828' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      Monthly Performance
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#4caf50" />
                        <Bar dataKey="incomplete" fill="#f44336" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;