db.firstRun.aggregate([
  {
    $search: {
      index : "testing",
      text: {
        query: "python",
        path: ["languages", "title"]
      }
    }
  },
  {
    $project: {
      "title": 1,
      "languages": 1
    }
  },
  {
    $limit: 5
  }
])


db.listingsAndReviews.aggregate([
  {
    $search: {
      "text": {
        "query": "garden",
        "path": "name"
      }
    }
  },
  {
    $project: {
      name: 1,
      score: { $meta: "searchScore" }
    }
  }
])

db.listingsAndReviews.aggregate([
  {
    $search: {
      index: 'default',
      text: {
        query: 'duplex',
        path: {
          'wildcard': '*'
        }
      }
    }
  }
])

db.listingsAndReviews.aggregate([
    {$limit: 5}
])

db.customers.aggregate([
  {$limit: 5}
])

db.customers.aggregate([
  {
    $search: {
      index: 'defaulta',
      text: {
        query: 'dana',
        path: {
          'wildcard': '*'
        }
      }
    }
  }
])

db.fruit.aggregate([
  {
    $search: {
      index : "testing",
      compound: {
        must: [{
          text: {
             "query": "varieties",
             "path": "description"
          }
        }],
        "should": [
          {
            "text": {
              "query": "Fuji",
              "path": "description"
            }
          },
          {
            "text": {
              "query": "Golden Delicious",
              "path": "description"
            }
          }],
          "minimumShouldMatch": 1
        }
      }
    }
])

.aggregate([
  {
    $search: {
      index: 'testing',
      compound: {
        must: [{
          text: {
             "query": "linux",
             "path": ["comment","title"]
          }
        }],
        "should": [
          {
            "text": {
              "query": "list",
              "path": ["comment","title"]
            }
          },
          {
            "text": {
              "query": "array",
              "path": ["comment","title"]
            }
          }],
          "minimumShouldMatch": 1
        }
    }
  },
  {$limit: 10}
])