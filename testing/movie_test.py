
from tmdbv3api import TMDb
tmdb = TMDb()
tmdb.api_key = "7d9cb427929e6667c95922dc95d89314"

from tmdbv3api import Movie

movie = Movie()

#recommendations = movie.recommendations(movie_id=111)

#for recommendation in recommendations:
#    print(recommendation.title)
#    print(recommendation.overview)
	
search = movie.search('Rocky')

for res in search:
    print(res.id)
    print(res.title)
    print(res.overview)
    print(res.poster_path)
    print(res.vote_average)	