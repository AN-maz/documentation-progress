const app = require('./src/App');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});