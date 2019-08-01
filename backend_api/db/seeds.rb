# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.all.destroy_all
User.all.destroy_all
Art.all.destroy_all

lawrence = User.create(name: "Lawrence")
aruna = User.create(name: "Aruna")
fede = User.create(name: "Federica")
amy = User.create(name: "Amy")
louise = User.create(name: "Louise")
jowita = User.create(name: "Jowita")

puts "----SEEDED USERS-----"

games = Game.create ([
    {user_id: lawrence.id, score: rand(1..500)},
    {user_id: aruna.id, score: rand(1..500)},
    {user_id: fede.id, score: rand(1..500)},
    {user_id: amy.id, score: rand(1..500)},
    {user_id: louise.id, score: rand(1..500)},
    {user_id: jowita.id, score: rand(1..500)},
    {user_id: lawrence.id, score: rand(1..500)}
])

puts "----SEEDED GAMES-----"


arts = Art.create ([
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"},
    {title: Faker::Hipster.word, img_url: "http://lorempixel.com/386/386/"}
])

puts "----SEEDED ARTS-----"