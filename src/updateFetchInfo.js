const url = 'https://pizzaapp.docs.apiary.io/#reference/0/menu/get-the-menu';

// Fetch the HTML content
fetch(url)
  .then(response => response.text())
  .then(html => {
    // Parse HTML to extract links
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Extract all anchor tags with href attributes (GET links)
    const links = doc.querySelectorAll('a[href]');
    links.forEach(link => {
        console.log('Found link:', link.href);
    });
  })
  .catch(error => {
    console.error('Error fetching the page:', error);
  });