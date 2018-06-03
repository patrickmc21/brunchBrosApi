const mockUser = {
  email: 'pat@askjeeves.com',
  username: 'pmac89'
};

const mockMaps = [
  { 
    title: "Bagel Joints",
    location: "New York City",
    description: "Best Bagels in Metropolis",
    thumbnail: "FakeImage.jpg",
    date: "5/22/2018"
  },
  {    
    title: 'Breakfast Burritos',
    location: 'Denver, CO',
    description: 'Denver\'s zestiest breakfast burritos',
    thumbnail: 'https://www.macheesmo.com/wp-content/uploads/2016/10/Rotisserie-Chicken-Breakfast-Burrito.jpg',
    date: "2/4/2017"    
  },
  {    
    title: 'Bike Trails',
    location: 'Moab, UT',
    description: 'Get sendy! Bruh!',
    thumbnail: 'https://static.evo.com/content/travel-guides/bike/ut/moab/pg_170427_ecnh2_795.jpg',
    date: "5/6/2015"    
  },
  {    
    title: "Brunch Spots",
    location: "Denver, CO",
    description: "Denver's Best Brunch Spots",
    thumbnail: "https://www.lamarchaberkeley.com/wp-content/uploads/2017/12/636078593415248297-149816288_brunch.jpg",
    date: "1/3/2013"    
  },
  {    
    title: "Scando Ski Resorts",
    location: "Scandinavia",
    description: "Scando Land's best resorts",
    thumbnail: "https://www.skisafari.com/sites/ss/files/are-aerial-credit-johan-huczkowsky.jpg",
    date: "1/3/2013"    
  }
];

const mockPins = [
  {  
    map: 'Breakfast Burritos',
    title: "Santiagos",
    coordinates: [-105.00111472, 39.7254052]
  },
  {    
    map: 'Breakfast Burritos',
    title: "Las Dalias",
    coordinates: [-105.086365, 39.6818245]
  },
  {   
    map: 'Breakfast Burritos', 
    title: "Los Arcos Express",
    coordinates: [-105.1167617, 39.73988]
  },
  {   
    map: 'Breakfast Burritos', 
    title: "Illegal Pete\'s",
    coordinates: [-105.0021879, 39.75087]
  },
  {    
    map: 'Breakfast Burritos',
    title: "Jack-N-Grill",
    coordinates: [-105.0270726, 39.7541272]
  },
  {    
    map: 'Bike Trails',
    title: "Captain Ahab",
    coordinates: [-109.6075219, 38.52251]
  },
  {   
    map: 'Bike Trails', 
    title: "Whole Enchilada",
    coordinates: [-109.2385098, 38.5023764]
  },
  {  
    map: 'Bike Trails',  
    title: "Mag 7",
    coordinates: [-109.8663376, 38.5785377]
  },
  {    
    map: 'Bike Trails',
    title: "Navajo Rocks",
    coordinates: [-109.7872497, 38.6375701]
  },
  {    
    map: 'Bike Trails',
    title: "Klondike Bluffs",
    coordinates: [-109.7350208, 38.7942989]
  },
  {    
    map: "Brunch Spots",
    title: "Snooze A.M. Eatery",
    coordinates: [-104.9982384, 39.7505335]
  },
  {    
    map: "Brunch Spots",
    title: "Beatrice & Woodsley",
    coordinates: [-104.9790081, 39.7317999]
  },
  {    
    map: "Brunch Spots",
    title: "Syrup",
    coordinates: [-105.0472661, 39.7321978]
  },
  { 
    map: "Brunch Spots",   
    title: "Sassafras",
    coordinates: [-105.2133915, 39.749107]
  },
  { 
    map: "Brunch Spots",   
    title: "The Kitchen",
    coordinates: [-105.2551917, 40.0058074]
  },
  {    
    map: "Scando Ski Resorts",
    title: "Klappen",
    coordinates: [13.340533, 61.032407]
  },
  {    
    map: "Scando Ski Resorts",
    title: "Myrkdalen",
    coordinates: [6.9017042, 59.9355036]
  },
  {    
    map: "Scando Ski Resorts",
    title: "Åre",
    coordinates: [13.0617028, 63.3971461]
  },
  {    
    map: "Scando Ski Resorts",
    title: "Vinterpark",
    coordinates: [10.6514738, 59.9046241]
  },
  {    
    map: "Scando Ski Resorts",
    title: "Geilo",
    coordinates: [7.981613, 60.5352744]
  }
];

const mockPosts = [
  {    
    pin: "Santiagos",
    title: "Cheap and spicy",
    desc: "Hand-held burritos with a kick",
    likes: 69,
    thumbnail: 'https://igx.4sqi.net/img/general/200x200/2GC6GVab6CbJ9E2lHjEj-YLg9XEbO_0uddr6bpXhWiE.jpg'
  },
  {    
    pin: "Las Dalias",
    title: "Hidden burrito gem",
    desc: "Great flavor",
    likes: 69,
    thumbnail: 'http://lasdaliaslakewood.com/communities/1/000/001/383/861//images/4787524_460x212.jpg'
  },
  {   
    pin: "Los Arcos Express",
    title: "Quick and easy burritos!",
    desc: "Drive-thru deliciousness",
    likes: 69,
    thumbnail: 'https://s3-media4.fl.yelpcdn.com/bphoto/azseOr9qo7lVSgaCtgbpOQ/348s.jpg'
  },
  {    
    pin: "Illegal Pete\'s",
    title: "Punk rock burritos",
    desc: "Chorizo and green chili is where it is at!",
    likes: 69,
    thumbnail: 'http://illegalpetes.com/wp-content/uploads/2015/06/lodo01.jpg'
  },
  {    
    pin: "Jack-N-Grill",
    title: "Biggest burrito in denver",
    desc: "14lbs of green chili, eggs, and potatoes",
    likes: 69,
    thumbnail: 'https://c1.staticflickr.com/5/4139/4927890673_80772e8fc4_b.jpg'
  },
  {    
    pin: "Captain Ahab",
    title: "Sendy huck fest",
    desc: "Rock slabs and tech fest",
    likes: 69,
    thumbnail: 'https://smba.lertprograms.com/wp-content/uploads/2014/01/IMG_2231-1030x769.jpg'
  },
  {    
    pin: "Whole Enchilada",
    title: "Moab must ride",
    desc: "Three zones. Flow, Send, Chunder",
    likes: 69,
    thumbnail: 'https://c1.staticflickr.com/3/2566/3982227216_40beb7f9a5_z.jpg?zz=1'
  },
  {    
    pin: "Mag 7",
    title: "Epic ride",
    desc: "Take golden rim instead of golden spike before portal",
    likes: 69,
    thumbnail: 'https://cdn.allmoab.com/images/content/10110_11424_HikeaBike_along_the_Portal_Trail_in_Moab_lg.jpg'
  },
  {    
    pin: 'Navajo Rocks',
    title: "Good loop ride",
    desc: "Mesa top is dope!",
    likes: 69,
    thumbnail: 'https://cdn-files.apstatic.com/mtb/7017163_smallMed_1490052316.jpg'
  },
  {    
    pin: "Klondike Bluffs",
    title: "Great Camping/ Great rides",
    desc: "Home of flow-ab",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Snooze A.M. Eatery",
    title: "Best Brunch in Denver",    
    desc: "Great coffee, not enough tank-tops",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Beatrice & Woodsley",
    title: "Second Best",    
    desc: "Definitely enough tanks",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Syrup",
    title: "Great eggs",    
    desc: "No, seriously, the best eggs",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Sassafras",
    title: "Best Bloody Marys",    
    desc: "Sunday 9-2 Bottomless Bloody Bar",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "The Kitchen",
    title: "Bacon",    
    desc: "Apple Crusted Bacon, that is all.",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  }, 
  {    
    pin: "Klappen",
    title: "Great Park",    
    desc: "The laps are so damn fast",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Myrkdalen",
    title: "Fjords",    
    desc: "Are dope",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Åre",
    title: "Bygett",    
    desc: "That is all.",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Vinterpark",
    title: "Hot Laps",
    desc: "After work, open til midnight",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  },
  {    
    pin: "Geilo",
    title: "Must be good",
    desc: "Oystein Lives Here.",
    likes: 69,
    thumbnail: 'https://i.ytimg.com/vi/UgJF1pbdMyA/maxresdefault.jpg'
  }
];

module.exports = { mockUser, mockMaps, mockPins, mockPosts };
