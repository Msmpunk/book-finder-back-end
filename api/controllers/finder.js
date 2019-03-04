'use strict';

import axios from 'axios';


export async function getBooks(req, res) {
  try {
    const { bookName } = req.query;
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`);
    const data = result.data.items;
    const bookData = []

    for (let i = 0; i < data.length; i += 1) {
      let valueImg = !data[i].volumeInfo.imageLinks ? false : data[i].volumeInfo.imageLinks.thumbnail
      bookData.push({
        id: data[i].id,
        title: data[i].volumeInfo.title,
        publisher: data[i].volumeInfo.publisher,
        publishedDate: data[i].volumeInfo.publishedDate,
        description: data[i].volumeInfo.description,
        previewLink: data[i].volumeInfo.previewLink,
        imageLinks: valueImg,
        authors: data[i].volumeInfo.authors,
      });
    }

    return res.send({
        ok: true,
        books: bookData,
    });
  } catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
}
