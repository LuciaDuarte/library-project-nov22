const { Schema, model } = require('mongoose');

const authorSchema = new Schema(
  {
    name: String,
    bio: String,
    picture_url: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3BlbiUyMGJvb2t8ZW58MHx8MHx8&w=1000&q=80'
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
  },
  {
    timestamps: true
  }
);
const Author = model('Author', authorSchema);
module.exports = Author;
