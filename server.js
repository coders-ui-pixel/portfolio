const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to fetch data
app.get('/api/data', (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      res.json(JSON.parse(data));
    } else {
      res.json(null);
    }
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST endpoint to save data
app.post('/api/data', (req, res) => {
  try {
    const data = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
