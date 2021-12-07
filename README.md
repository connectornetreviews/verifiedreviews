How to display Verified Reviews Rating and Reviews on your product page :

Note : You may need to adjust the following depending on your theme

Classic store-theme :

1 - First, add the Verified Reviews module as a dependency in your store. To do so, add "verifiedreviews.netreviews": "0.x" to the list of dependencies in your manifest.json

2 - Go to your product.json template

3 - Under "flex-layout.col#right-col", "children", insert the "netreviews-rating" bloc where you wish to display the rating

4 - Under "store.product", "children", insert the "netreviews-reviews" bloc where you wish to display the reviews

5 - Add your API KEY, SECRET KEY and set the language of the App in the APP > My apps > Netreviews Connector > Settings

6 - If you have the Reviews and Ratings app installed you have to unsitall it in APP > My apps

You are all done !