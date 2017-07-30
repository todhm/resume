/*
This is empty on purpose! Your code to build the resume will go here.
 */
var model = {
        skills : ["Python", "backend-programming","Machine-learning","Computer Vision","Full-Stack",'Data Analysis'],
        bio : {
                    "name" : "Heemyung",
                    'role': "Data-Engineer",
                    "age"  : 25,
                    'welcomeMessage':'Nice to meet you',
                    "skills" : ["Python", "backend-programming","Machine-learning","Computer Vision","Full-Stack",'Data Analysis'],
                    'contacts': {'mobile':'+82-10-7167-5299',
                                'email': 'gmlaud14@gmail.com',
                                'github': 'todhm',
                                'location': '평촌대로40번길 100'},
                    'images' :'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAkyAAAAJGE5NmMxYTgyLTI1NWEtNGJkNi05YWMwLTU5MWE2NzUxYzJiOA.jpg'
                },
        project : {"projects":[{
                    'title': 'Behavioral Cloning',
                    'dates':'20170408 ~ 20170419',
                    'description': 'Project make autonomous car on simulator by predicting steering angle through deep learning model',
                    'images': '/Users/hm/desktop/homemaster/week13/frontend-nanodegree-resume/images/video_img.jpg'},
                    {
                    'title': 'Restaurant Menu Project',
                    'dates':'20170412 ~ 20170420',
                    'description': 'Project to make Restaurant menu website using flask template',
                    'images': './images/restaurant_menu.png'},
                    {
                    'title': 'Presidential speech classification',
                    'dates':'20161031 ~ 20161215',
                    'description': 'Project to classify Korean presidents based on their speeches using machine learning model',
                    'images': './images/tf_idf.png'}]},

        work : {'jobs':[{
                "employer":"Homemaster",
                "title" : "Data Engineer",
                "dates": "20170103 ~ ",
                "description": "Dev-ops data engineer who engineer and analayze data for team growth.",
                "location" : "신사역"},
                {
                "employer": "KOTRA",
                "title" : "Research Intern",
                "dates": "20150102 ~ 20150630",
                "description":"Research Chiliean Market to find opportunities for Korean companies who try to export products to Chile",
                "location" : "Chile Santiago"}]},

        education : {
            "schools":[{
                "name": "Hankuk University of Foreign Studies",
                "city": "Seoul",
                "degree": "bachelor's dgree",
                "location":"서울시 동대문구 이문동",
                "majors":["Economics","Spanish"]
            }],
            "onlineCourses":[
            {"title":"Udacity Self driving car nanodegree programme",
             "url":"udacity.com"},
            {"title":"Learning how to learn",
             "url": "coursera.org"},
             {"title":"Python for Everybody",
              "url": "coursera.org"}]},
        clickLocations : []

          };


var octopus = {
    init:function(){

        profile_view.init();
        work_view.init();
        project_view.init();
        map_view.init();

    },
    get_bio:function(){ return model.bio},
    get_skills: function(){ return model.skills},
    get_project: function(){return model.project},
    get_work: function(){return model.work},
    get_education: function(){return model.education},
    locationize: function(){
        var work_obj =  model.work;
        var locations = [];
        for(var job =0 ; job < work_obj.jobs.length; job ++ ){
            locations.push(work_obj.jobs[job]['location']);
        }
        return locations

    },
    in_name: function(strs){
        var splitted_name = strs.trim().split(" ");
        var first_name    = splitted_name[0][0].toUpperCase() + splitted_name[0].slice(1).toLowerCase();
        var last_name     = splitted_name[1].toUpperCase();
        var name = first_name + " " + last_name;
        return name;
    },
    logClick: function(x,y){
        console.log('x location: ' + x + '; y location: ' + y);
        model.clickLocations.push(
        {
          x: x,
          y: y
      })
    }

}

var work_view = {

    init : function(){
        this.render();
    },
    render: function(){
        work = octopus.get_work();
        for( var wo = 0; wo < work['jobs'].length; wo ++){
            $('#workExperience').append(HTMLworkStart);
            var formattedjobs = HTMLworkEmployer.replace('%data%', work['jobs'][wo]['employer']);
            var formattedjob_title = HTMLworkTitle.replace('%data%',work['jobs'][wo]['title']);
            var formatted = formattedjobs + formattedjob_title;
            var work_date = HTMLworkDates.replace('%data%',work['jobs'][wo]['dates']);
            var description = HTMLworkDescription.replace('%data%',work['jobs'][wo]['description']);
            $('.work-entry:last').append(formatted);
            $('.work-entry:last').append(work_date);
            $('.work-entry:last').append(description);

        }

    }
}


var profile_view= {
    init:function(){
        this.HTMLheaderName = '<h1 id="name">%data%</h1>';
        this.HTMLheaderRole = '<span>%data%</span><hr>';
        this.HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
        this.HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
        this.HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
        this.HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
        this.HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
        this.HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
        this.HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';
        this.render();
    },
    render:function(){
        var bio = octopus.get_bio();
        console.log(bio);
        var formattedname = this.HTMLheaderName.replace('%data%',bio['name']);
        $('#header').append(formattedname);

        var formattedrole = this.HTMLheaderRole.replace('%data%',bio['role']);
        $('#header').append(formattedrole);

        var formattedmobile = this.HTMLmobile.replace('%data%',bio['contacts']['mobile']);
        $('#header').append(formattedmobile);

        if(bio.skills.length > 0){
        $('#header').append(HTMLskillsStart);
        var formattedbiopic = HTMLbioPic.replace('%data%',bio.images)
        $('#header').append(formattedbiopic)

        for (skill_idx in bio.skills){
        var formattedSkills = HTMLskills.replace('%data%',bio.skills[skill_idx]);
        $('#skills').append(formattedSkills);
            }
        }

    }
}

var project_view = {
    init:function(){
        this.render();
    },
    render: function(){
        $('#projects').append(HTMLprojectStart)
        var project_obj = octopus.get_project();
        for (var i =0 ; i <project_obj['projects'].length ; i ++){
            var formattedtitle = HTMLprojectTitle.replace("%data%",project_obj['projects'][i]['title']);
            var formatteddates = HTMLprojectDates.replace("%data%",project_obj['projects'][i]['dates']);
            var formatteddescript = HTMLprojectDescription.replace("%data%",project_obj['projects'][i]['description']);
            var formattedimage = HTMLprojectImage.replace("%data%",project_obj['projects'][i]['images']);
            $('.project-entry:last').append(formattedtitle);
            $('.project-entry:last').append(formatteddates);
            $('.project-entry:last').append(formatteddescript);
            $('.project-entry:last').append(formattedimage);
            $('img:last').css('max-height','500px');
            $('img:last').css('max-width','700px');
        }


    }
}
var map_view ={
    init: function(){
        $('button').click(function() {
          var $name = $('#name');
          var iName = octopus.inName($name.text()) || function(){};
          $name.html(iName);
        });
        var map;    // declares a global map variable

        window.addEventListener('load', this.render);

        // Vanilla JS way to listen for resizing of the window
        // and adjust map bounds
        window.addEventListener('resize', function(e) {
          //Make sure the map bounds get updated on page resize
          map.fitBounds(mapBounds);
        });


    },
    render: function(){
          var bio = octopus.get_bio();
          var education = octopus.get_education();
          var work = octopus.get_work();
          var locations;

          var mapOptions = {
            disableDefaultUI: true
          };

          /*
          For the map to be displayed, the googleMap var must be
          appended to #mapDiv in resumeBuilder.js.
          */
          map = new google.maps.Map(document.querySelector('#map'), mapOptions);


          /*
          locationFinder() returns an array of every location string from the JSONs
          written for bio, education, and work.
          */
          function locationFinder() {

            // initializes an empty array
            var locations = [];

            // adds the single location property from bio to the locations array
            locations.push(bio.contacts.location);

            // iterates through school locations and appends each location to
            // the locations array. Note that forEach is used for array iteration
            // as described in the Udacity FEND Style Guide:
            // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
            education.schools.forEach(function(school){
              locations.push(school.location);
            });

            // iterates through work locations and appends each location to
            // the locations array. Note that forEach is used for array iteration
            // as described in the Udacity FEND Style Guide:
            // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
            work.jobs.forEach(function(job){
              locations.push(job.location);
            });

            return locations;
          }

          /*
          createMapMarker(placeData) reads Google Places search results to create map pins.
          placeData is the object returned from search results containing information
          about a single location.
          */
          function createMapMarker(placeData) {

            // The next lines save location data from the search result object to local variables
            var lat = placeData.geometry.location.lat();  // latitude from the place service
            var lon = placeData.geometry.location.lng();  // longitude from the place service
            var name = placeData.formatted_address;   // name of the place from the place service
            var bounds = window.mapBounds;            // current boundaries of the map window

            // marker is an object with additional data about the pin for a single location
            var marker = new google.maps.Marker({
              map: map,
              position: placeData.geometry.location,
              title: name
            });

            // infoWindows are the little helper windows that open when you click
            // or hover over a pin on a map. They usually contain more information
            // about a location.
            var infoWindow = new google.maps.InfoWindow({
              content: '<h3>'+name +'</h3>'
            });

            // hmmmm, I wonder what this is about...
            google.maps.event.addListener(marker, 'click', function() {
              // your code goes here!
               infoWindow.open(map,marker);

            });

            // this is where the pin actually gets added to the map.
            // bounds.extend() takes in a map location object
            bounds.extend(new google.maps.LatLng(lat, lon));
            // fit the map to the new marker
            map.fitBounds(bounds);
            // center the map
            map.setCenter(bounds.getCenter());
          }

          /*
          callback(results, status) makes sure the search returned results for a location.
          If so, it creates a new map marker for that location.
          */
          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              createMapMarker(results[0]);
            }
          }

          /*
          pinPoster(locations) takes in the array of locations created by locationFinder()
          and fires off Google place searches for each location
          */
          function pinPoster(locations) {

            // creates a Google place search service object. PlacesService does the work of
            // actually searching for location data.
            var service = new google.maps.places.PlacesService(map);

            // Iterates through the array of locations, creates a search object for each location
              locations.forEach(function(place){
              // the search request object
              var request = {
                query: place
              };

              // Actually searches the Google Maps API for location data and runs the callback
              // function with the search results after each search.
              service.textSearch(request, callback);
            });
          }

          // Sets the boundaries of the map based on pin locations
          window.mapBounds = new google.maps.LatLngBounds();

          // locations is an array of location strings returned from locationFinder()
          locations = locationFinder();

          // pinPoster(locations) creates pins on the map for each location in
          // the locations array
          pinPoster(locations);


    }

}
octopus.init();


$('#main').append(internationalizeButton);
$('#mapDiv').append(googleMap);
