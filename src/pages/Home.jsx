import React from 'react'
import Banner from '../components/Banner'
import LatestBooks from '../components/LatestBooks'
import TopGenres from '../components/TopGenres'
import HeroCarousel from '../components/HeroCarousel'
import BookOfTheWeek from '../components/BookOfTheWeek'
import AboutTheBookHaven from '../components/AboutTheBookHaven'
import TopRated from '../components/TopRated'
import useAuth from '../hooks/useAuth'
import Loading from '../components/Loading'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CommunityCTA from '../components/CommunityCTA'
import NewsletterSection from '../components/NewsletterSection'


const Home = () => {

  const { loading } = useAuth()

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="overflow-x-hidden">
      {/* Section 1: Hero */}
      <HeroCarousel></HeroCarousel>

      {/* Section 2: Stats */}
      <Stats />

      {/* Section 3: Latest Books */}
      <LatestBooks></LatestBooks>

      {/* Section 4: Top Genres */}
      <TopGenres></TopGenres>

      {/* Section 5: Book of the Week */}
      <BookOfTheWeek></BookOfTheWeek>

      {/* Section 6: Top Rated */}
      <TopRated></TopRated>

      {/* Section 7: About */}
      <AboutTheBookHaven></AboutTheBookHaven>

      {/* Section 8: Testimonials */}
      <Testimonials />

      {/* Section 9: FAQ */}
      <FAQ />

      {/* Section 10: Community CTA */}
      <CommunityCTA />

      {/* Section 11: Newsletter */}
      <NewsletterSection />

    </div>
  )
}

export default Home