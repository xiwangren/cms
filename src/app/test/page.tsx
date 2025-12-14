'use client';
import { useState } from 'react';
import { SliceZone } from '@prismicio/react';
import { components } from "@/slices";
export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      setArticles(result.data);
    }
    
    setLoading(false);
  };

  return (
      <SliceZone 
        slices={[{ 
          id: "test-slice", 
          "slice_type": "text", 
          "primary": { 
            "text": [
              {
                "type": "paragraph",
                "text": "文章列表",
                "spans": []
              }
            ]
          }
        }] as any} 
        components={components} 
      />

    // <div style={{ padding: '20px' }}>
    //   <h1>文章列表</h1>
      
    //   <button 
    //     onClick={fetchArticles}
    //     disabled={loading}
    //     style={{
    //       padding: '10px 20px',
    //       background: '#0070f3',
    //       color: 'white',
    //       border: 'none',
    //       borderRadius: '5px',
    //       cursor: loading ? 'not-allowed' : 'pointer'
    //     }}
    //   >
    //     {loading ? '加载中...' : '获取文章'}
    //   </button>

    //   <div style={{ marginTop: '20px' }}>
    //     {articles.map(article => (
    //       <div key={article.id} style={{
    //         border: '1px solid #ddd',
    //         padding: '15px',
    //         margin: '10px 0',
    //         borderRadius: '5px'
    //       }}>
    //         <h3>{article.title}</h3>
    //         <p>{article.content}</p>
    //         <small>作者: {article.author}</small>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}