const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => blogs.map(n => n.likes).reduce((a, b) => a + b)

const favoritePost = blogs => blogs.sort((a, b) => (a.likes > b.likes ? 1 : -1))[blogs.length - 1]

const mostBlogs = (blogs) => {
  const mostBlogsPair = _.maxBy((_.toPairs(_.countBy(blogs, 'author'))), n => n[1])
  return { author: mostBlogsPair[0], blogs: mostBlogsPair[1] }
}

const mostLikes = (blogs) => {
  const pairsByAuthors = _.toPairs(_.groupBy(blogs, 'author'))
  const likesByAuthors = pairsByAuthors.map(n => (
    [n[0], n[1].reduce((sum, next) => sum += next.likes, 0)] //eslint-disable-line
  ))
  const maxLikes = _.maxBy(likesByAuthors, n => n[1])
  return { author: maxLikes[0], likes: maxLikes[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoritePost,
  mostBlogs,
  mostLikes,
}
