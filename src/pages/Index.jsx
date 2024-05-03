import { Box, Input, Button, List, ListItem, IconButton, useColorModeValue, Text } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box p={8} maxW="500px" mx="auto">
      <Text fontSize="2xl" mb={4} textAlign="center">Todo List</Text>
      <Box display="flex" mb={4}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} ml={2} colorScheme="blue">Add</Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} p={2} bg={bg} display="flex" alignItems="center" justifyContent="space-between">
            <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => handleToggleComplete(task.id)}
                colorScheme={task.isCompleted ? "green" : "gray"}
                aria-label="Complete Task"
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete Task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;