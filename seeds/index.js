const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./placeHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true, 
    useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected (seed data)');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
        })
        
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


// const campgroundData = [
//     {
//         name: "Cider Valley",
//         price: "50",
//         image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac sem mi. Donec vel tincidunt dui. Vestibulum luctus sem sed lacus pellentesque tempus. Maecenas suscipit, turpis sit amet vestibulum posuere, orci tellus sollicitudin neque, vel viverra nulla metus quis eros. Quisque sed leo condimentum, molestie nisl et, tincidunt ligula. Pellentesque ac enim in lorem scelerisque hendrerit quis a dolor. Donec consequat augue et enim vulputate efficitur. Mauris accumsan purus vitae quam tincidunt, at bibendum leo viverra. Donec dolor risus, vestibulum fermentum sem sed, vulputate tincidunt nulla.",
//         author:{
//             id : "588c2e092403d111454fff76",
//             username: "Justin"
//         }
//     },
//     {
//         name: "Mountain View",
//         price: "50",
//         image: "https://blog-assets.thedyrt.com/uploads/2018/06/freecampingspot-2000x1120.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac sem mi. Donec vel tincidunt dui. Vestibulum luctus sem sed lacus pellentesque tempus. Maecenas suscipit, turpis sit amet vestibulum posuere, orci tellus sollicitudin neque, vel viverra nulla metus quis eros. Quisque sed leo condimentum, molestie nisl et, tincidunt ligula. Pellentesque ac enim in lorem scelerisque hendrerit quis a dolor. Donec consequat augue et enim vulputate efficitur. Mauris accumsan purus vitae quam tincidunt, at bibendum leo viverra. Donec dolor risus, vestibulum fermentum sem sed, vulputate tincidunt nulla.",
//         author:{
//             id : "588c2e092403d111454fff71",
//             username: "Mariah"
//         }
//     },
//     {
//         name: "Sohill Spring",
//         price: "50",
//         image: "https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_md.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac sem mi. Donec vel tincidunt dui. Vestibulum luctus sem sed lacus pellentesque tempus. Maecenas suscipit, turpis sit amet vestibulum posuere, orci tellus sollicitudin neque, vel viverra nulla metus quis eros. Quisque sed leo condimentum, molestie nisl et, tincidunt ligula. Pellentesque ac enim in lorem scelerisque hendrerit quis a dolor. Donec consequat augue et enim vulputate efficitur. Mauris accumsan purus vitae quam tincidunt, at bibendum leo viverra. Donec dolor risus, vestibulum fermentum sem sed, vulputate tincidunt nulla.",
//         author:{
//             id : "588c2e092403d111454fff77",
//             username: "Ada"
//         }
//     }
// ]

// function seedDB(){
//     //Remove all campgrounds & comments
//     Campground.deleteMany({}, function(err){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("removed campgrounds!");
//             Comment.deleteMany({}, function(err){
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log("removed comments!");
//                 //Add a few campgrounds
//                 campgroundData.forEach(seed => {
//                     Campground.create(seed, function(err, campground){
//                         if (err) {
//                             console.log(err)
//                         } else {
//                             console.log("added a campground!")
//                             //Add a few comments
//                             Comment.create(
//                                 {
//                                     text: "Absolutely splendid experience", 
//                                     author:{
//                                         id : "588c2e092403d111454fff76",
//                                         username: "Mide"
//                                     }
//                                 }, function(err, comment){
//                                 if (err) {
//                                     console.log(err)
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("created new comment!");
//                                 }
//                             });
//                         }
//                     });
//                 });
//               }  
//             })
//         }
//     });
// }

