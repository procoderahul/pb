const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();
const port = 4000;
const collection = require("./src/conn")


const staticPath = path.join(__dirname, "../public")
const templatePath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))
app.use(express.urlencoded({ extended: false }))




app.get('/', async (req, res) => {
    try {
      const data = await collection.find({}).sort({ name: 1 });
      res.render('index', { data });
    }
     catch (err) {
      res.status(500).send('Internal Server Error');
    }

  });

app.post("/add", async (req, res) => {
    const data = {
        name: req.body.name,
        phone: req.body.phone, 
    }


    await collection.insertMany([data])
    res.redirect('/')
})

app.post('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await collection.findByIdAndDelete(id);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/edit/:id', async (req, res) => {
    const contact = await collection.findById(req.params.id);
    res.render('edit', { contact });
});


app.post('/update/:id', async (req, res) => {
  const { name, phone } = req.body;
  const contact = await collection.findByIdAndUpdate(req.params.id, { name, phone }, { new: true });

  res.redirect('/');
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
})