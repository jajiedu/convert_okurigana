const express = require('express');
const app = express();
const Kuroshiro = require('kuroshiro');
const KuroshiroAnalyzer = require('kuroshiro-analyzer-kuromoji');
app.use(express.static('static'));

app.get('/convert/okurigana', async (request, response, next) => {
  try {
    const kuroshiro = new Kuroshiro();
    await kuroshiro.init(new KuroshiroAnalyzer({ dictPath: 'node_modules/kuromoji/dict' }));
    const text = request.query.text;
    const okurigana = await kuroshiro.convert(text, { to: 'hiragana', mode: 'okurigana' });
    response.send(okurigana);
  }
  catch (e) {
    next(e);
  }
});
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))