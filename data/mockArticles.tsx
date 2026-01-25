export const mockArticles = [
  {
    id: "1",
    uid: "article1",
    type: "article",
    author: "figure.chen",
    category: "technology",
    data: {
      title: { text: "First Article Title" },
      content: { text: "This is the content of the first article." },
      publishDate: "2023-01-01",
      featuredImage: { 
        url: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?rect=0%2C0%2C8640%2C8640&w=2000&h=2000",
        width: 2000,
        height: 2000
      },
      "slices": [
        {
          "slice_type": "text",
          "primary":{
            "text": "This is the text of the first article."
          },
       },

      ],
   },
  },
  {
    id: "2",
    uid: "article2",
    type: "article",
    author: "figure.chen",
    category: "technology",
    data: {
      title: { text: "First Article Title" },
      content: { text: "This is the content of the first article." },
      publishDate: "2023-01-01",
      featuredImage: { 
        url: "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f",
        width: 2000,
        height: 2000
      },
      "slices": [
        {
          "slice_type": "text",
          "primary":{
            "text": "This is Rich Text, which includes both external links and links to internal documents. Links should be handled intelligently or everything might break. Don't forget about media, too! Do your best to render images using an HTML Serializer. As you know hiking can be a very fulfilling orem ipsum dolor…"
          }
       },

      ],
   },
  },
];