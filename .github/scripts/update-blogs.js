const axios = require('axios');
const fs = require('fs').promises;

const devtoUsername = process.env.DEVTO_USERNAME;

async function fetchLatestBlogs() {
  try {
    const devtoResponse = await axios.get(
      `https://dev.to/api/articles?username=${devtoUsername}&per_page=3`
    );
    const devtoBlogs = devtoResponse.data;

    const markdownContent = `
# Latest Blog Posts

${devtoBlogs.map((blog) => `- [${blog.title}](${blog.url})`).join('\n')}
`;

    await fs.writeFile('README.md', markdownContent);
    console.log('README.md updated with latest blog posts.');
  } catch (error) {
    console.error('Error fetching or updating blog posts:', error);
  }
}

fetchLatestBlogs();
