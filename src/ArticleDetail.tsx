import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      setError('')
      try {
        const apiKey = import.meta.env.VITE_NYT_API_KEY
        // NYT API does not support direct fetch by _id, so we search by fq=_id
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:(\"${id}\")&api-key=${apiKey}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setArticle(data.response.docs[0])
      } catch (err: any) {
        setError(err.message || 'Error fetching article')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!article) return <div className="p-8 text-center">Article not found.</div>

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <button className="mb-4 text-blue-600 hover:underline self-start" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="max-w-2xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">{article.headline.main}</h2>
        <div className="text-xs text-gray-400 mb-4">{new Date(article.pub_date).toLocaleString()}</div>
        <p className="mb-4">{article.lead_paragraph || article.snippet}</p>
        <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Read full article on NYT</a>
      </div>
    </div>
  )
}

export default ArticleDetail
