# Mongo data modeling

## Relationship types

- 1 to 1
- 1 to many
- many to many

## 1 to 1

A customer in our app can have only address - 1 customer to 1 address

```json
// user
{
  name: 'Lucia',
  address: {
    street: 'Heden'
    city: 'Lisbon'
  }
}
```

## 1 to many

A customer can have multiple addresses registered: 1 customer to many addresses

```json
// user
{
  "name": "Lucia",
  "address": [
    {
      "city": "Lisbon",
      "street": "Heden"
    },
    {
      "city": "Amadora",
      "street": "Av Republica"
    }
  ]
}
```

## Many to many

Our books can have multiple authors and authors can have multiple books

```json
// books
{
  title: 'My book',
  author: [1, 2, 3]
}

// authors
{
  name: 'Lucia',
  books: [4, 5, 6]
}
```

## Structuring relationships

## Embedded

address is embedded on the user: Stored inside the model

```json
// user
{
  name: 'Lucia',
  address: {
    street: 'Heden'
    city: 'Lisbon'
  }
}
```

## Normalized data model (reference)

having ids to reference other documents

```json
// books
{
  title: 'My book',
  author: [1, 2, 3]
}

// authors
{
  name: 'Lucia',
  books: [4, 5, 6]
}
```
