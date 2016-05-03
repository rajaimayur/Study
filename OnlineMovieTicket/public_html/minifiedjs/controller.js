OnlineMovieTicketApp.controller("movieStubController",["$scope","APP_CONST","$routeParams","$http","$location",function(e,t,a,s,o){e.tab=a.viewmode,e.changeTab=function(t){t!=e.tab&&o.path("/index/"+t)},e.getData=function(){"movies"==e.tab?s.get(t.path+"/data/movies.json").success(function(t){e.movies=t.BookMyShow.Event}):s.get(t.path+"/data/venues.json").success(function(t){e.cinemas=t.BookMyShow.Venues})},e.setFavourites=function(t){e.FavCinemas.indexOf(t.VenueCode)>=0?e.FavCinemas.splice(e.FavCinemas.indexOf(t.VenueCode),1):e.FavCinemas.push(t.VenueCode),e.addToSessionStorage("FavCinemas",e.FavCinemas)},e.getClass=function(t){return e.FavCinemas.indexOf(t.VenueCode)>=0?!1:!0},e.setMovie=function(t){e.addToSessionStorage("SelectedMovie",t);var a=e.getDataFromSessionStorage("SelectedCinema");null!=a?o.path("/date"):o.path("/index/cinemas")},e.setCinemas=function(t){e.addToSessionStorage("SelectedCinema",t);var a=e.getDataFromSessionStorage("SelectedMovie");null!=a?o.path("/date"):o.path("/index/movies")},e.init=function(){"cinemas"==e.tab&&(e.FavCinemas=JSON.parse(e.getDataFromSessionStorage("FavCinemas")),null==e.FavCinemas&&(e.FavCinemas=[])),e.getData()},e.init()}]),OnlineMovieTicketApp.controller("movieDateTimeDetailsController",["$scope","$location","APP_CONST","$http",function(e,t,a,s){e.selectDate=function(a){e.addToSessionStorage("SelectedDate",a),t.path("/seats")},e.AvilableDates=[];var o=10,n=new Date,i=n.getTime();e.AvilableDates.push(i);for(var c=1;o>c;c++){var l=i+864e5*c;e.AvilableDates.push(l)}}]),OnlineMovieTicketApp.controller("movieSelectSeatsController",["$scope","$location","APP_CONST","$http",function(e,t,a,s){var o=e.getDataFromSessionStorage("SelectedMovie"),n=e.getDataFromSessionStorage("SelectedCinema"),i=0;e.init=function(){var i=e.getDataFromSessionStorage("SelectedDate");e.SelectedCategory="Select category of seats",e.SelectedSeats="Select seats",e.selectseattime=!0,e.isselected=!1,e.actselected=!1,e.SelectCategory=[{category:"GOLD",price:400},{category:"PRIME",price:300},{category:"NORMAL",price:220}],null==o||null==n?t.path("/index/cinemas"):(e.SelectedMovie=o.EventTitle,e.SelectedCinema=n.VenuName,e.SelectedDate=i,s.get(a.path+"/data/pvr-seats.json").success(function(t){e.seats=t.seats}))},e.init(),e.getTotal=function(){for(var t=0,a=0;a<e.SelectCategory.length;a++)if(e.SelectCategory[a].category==e.SelectedCategory){t=e.SelectCategory[a].price;break}return t*Number(e.SelectedSeats)},e.changeSelected=function(){"Select category of seats"!=e.SelectedCategory&&"Select seats"!=e.SelectedSeats&&(e.isselected=!0)},e.setSeatSelected=function(t){var a=t.category+"_"+t.row+"_"+Number(t.code),s=a.toLowerCase(),o=$("#"+s).attr("class");(Number(e.SelectedSeats)!=i||o.indexOf("btn-success")>=0)&&(o.indexOf("btn-default")>=0?($("#"+s).removeClass("btn-default"),$("#"+s).addClass("btn-success"),i++):($("#"+s).removeClass("btn-success"),$("#"+s).addClass("btn-default"),i--)),Number(e.SelectedSeats)!=i?e.actselected=!1:e.actselected=!0},e.showAvailableSeats=function(){for(var t=[],a=0;a<e.seats.length;a++)e.seats[a].category!=e.SelectedCategory?e.seats[a].isAvailable=!1:e.seats[a].isAvailable=!0,t.push(e.seats[a]);e.seats=t,e.selectseattime=!1},e.checkout=function(){alert("Your tickit Is confirmed!"),sessionStorage.clear(),t.path("/index/cinemas")}}]);