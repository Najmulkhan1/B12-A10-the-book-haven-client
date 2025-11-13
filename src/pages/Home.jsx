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


const Home = () => {

  const {loading} = useAuth()

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div>
        {/* <Banner></Banner> */}
        <HeroCarousel></HeroCarousel>
        <LatestBooks></LatestBooks>
        <TopGenres></TopGenres>
        <BookOfTheWeek></BookOfTheWeek>
        <TopRated></TopRated>
        <AboutTheBookHaven></AboutTheBookHaven>
        
    </div>
  )
}

export default Home