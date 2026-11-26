import React, { useState, useEffect } from 'react'
import { Newspaper, ExternalLink, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockNews = {
  'Indian Institute of Technology Bombay': [
    { title: 'IIT Bombay launches new AI research center', source: 'Tech Today', date: '2024-01-15', url: '#' },
    { title: 'Record placements: 95% students placed', source: 'Education News', date: '2024-01-10', url: '#' },
    { title: 'New collaboration with Google for cloud computing', source: 'Tech Chronicle', date: '2024-01-05', url: '#' },
  ],
  'Indian Institute of Technology Delhi': [
    { title: 'IIT Delhi tops NIRF engineering rankings again', source: 'Education News', date: '2024-01-12', url: '#' },
    { title: 'New startup incubator launched on campus', source: 'Startup India', date: '2024-01-08', url: '#' },
  ],
  default: [
    { title: 'New research breakthrough in renewable energy', source: 'Science Daily', date: '2024-01-14', url: '#' },
    { title: 'Campus placement drive sees record participation', source: 'Career News', date: '2024-01-09', url: '#' },
    { title: 'International conference on AI hosted this month', source: 'Tech Weekly', date: '2024-01-03', url: '#' },
  ],
}

function CollegeNewsFeed({ collegeName }) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setNews(mockNews[collegeName] || mockNews.default)
      setLoading(false)
    }, 500)
  }, [collegeName])

  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-lg">Latest News</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
              <div className="w-20 h-20 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (news.length === 0) return null

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-bold text-lg">Latest News</h2>
      </div>
      <div className="space-y-3">
        {news.map((item, i) => (
          <Card key={i} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Newspaper className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-snug">{item.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(item.date).toLocaleDateString()}
                    </span>
                    <Badge variant="secondary" className="text-xs">{item.source}</Badge>
                  </div>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 mt-1">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default CollegeNewsFeed