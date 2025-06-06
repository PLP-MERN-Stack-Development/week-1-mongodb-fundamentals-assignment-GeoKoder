// TASK 2: BASIC CRUD OPERATIONS
// Find all books in the collection
db.books.find()

// Find all books by a specific author
db.books.find({ author: "George Orwell" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find in-stock books
db.books.find({ in_stock: true })

// Update the price of a specific book
db.books.updateOne(
  { title: "The Alchemist" },
  {
    $set: { 'price': '12.38', }
  }
)

// Delete a book by its title
db.books.deleteOne({ title: "Wuthering Heights" })

// TASK 3: ADVANCED QUERIES 
// Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 1950 }
})

// Return only the title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price in: 
// ascending order 
db.books.find().sort({ price: 1 })
// descending order
db.books.find().sort({ price: -1 })

//pagination
// Get page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Get page 2 (next 5 books)
db.books.find().skip(5).limit(5)

// Get page 3 (next 5 books)
db.books.find().skip(10).limit(5)


// TASK 4: AGGREGATION PIPELINE
// Average price 
db.books.aggregate([
  {
    $group: {
      _id: "$genre",                
      averagePrice: { $avg: "$price" } 
    }
  }
])

// Author with the most books 
db.books.aggregate([
  {
    $group: {
      _id: "$author",            
      totalBooks: { $sum: 1 }    
    }
  },
  {
    $sort: { totalBooks: -1 }    
  },
  {
    $limit: 1           
  }
])

// grouping by decade 
db.books.aggregate([
  {
    $project: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])


// TASK 5
// Index for title field 
db.books.createIndex({ title: 1 })

// Compound index
db.books.createIndex({ author: 1, published_year: 1 })

// Use of the explain method 
db.books.find({ author: "Alice", published_year: 2020 }).explain("executionStats");


