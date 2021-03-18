
# WAVENATION
Won BGC Engineering - Computing for Climate Award at cmd-f 2021
[https://devpost.com/software/wavenation](https://devpost.com/software/wavenation)

## Background & Inspiration

Every year, sea levels rise approximately 3mm. Using the Sea level elevation, we wanted to compare the elevations of cities lined up in coastal regions. Currently, there are no 3D models that we found that accurately represent when exactly cities sink. We wanted to use this data to create a beautiful model that represents the rising levels over the years, to the elevation of our cities.

## Description

Watch out for sea-level rise and check out if your country is sinking. We've always cared about this sea-level change and kept our eyes on it since we live around the seaside. We've been always wanting to try for lowering the sea-level not alone, but together!

[https://climate.nasa.gov/vital-signs/sea-level/](https://climate.nasa.gov/vital-signs/sea-level/)

## Purpose & Goals

The app shows the globe and when each country gets sunken based on a math algorithm we implemented with data from NASA! We hope that our application brings awareness to people as global warming is flooding our homes, cities, ultimately sinking what we once called home. We want to connect our communities together to fight against global warming and raise awareness by grouping people by their nation and giving them tasks to fight global warming.

## Goals

1.  Our first goal is to visually represent when landmasses sink as sea levels rise by creating a model that shows the rising sea levels against the current land elevation over time.
2.  Our second goal is to connect our communities together to fight against global warming and raise awareness. We connected people by placing them in teams assigned by their nation. Each team member are given tasks to tackle global warming (raising awareness by watching global warming related youtube videos, participate in a beach cleaning session)

## How we built it

We used Three.js to display the globe and CockroachDB for the data! We also built our own backend API as well as an algorithm that calculates the sea level. (Javascript, Three.js, CockroachDP, GoogleMaps API, GoogleCloud)

## Challenges we ran into

Implementing Three.js and manipulating it. Finding a data set for lands as the Google Maps API does not return enough information.

## Accomplishments that we're proud of

Implemented the globe and our own backend API!

## What we learned

CockroachDB and Three.js!

## What's next for WaveNation

We would like to display how the water level rises slightly on the globe. Also would like to add more function on the leaderboard for people to enjoy it more!

## Technological Complexity

Our technology works by using cartesian coordinates. We translated Cartesian coordinates into xyz values in a 3D plane. Cartesian coordinates range between lat (-180 - 180) and ltd -90 - 90). We wanted to confirm 64800 points on the earth to map it out in our 3D Three.js engine. Each point would have information such as elevation, city, country which we use to accurately map when cities sink. Our goal is to visually when exactly cities sink and where it sinks.

## Built With

HTML, CSS, JavaScript, Node.js, PostgreSQL, CockroachDB,  Three.js
