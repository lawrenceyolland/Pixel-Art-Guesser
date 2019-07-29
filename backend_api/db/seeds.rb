# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.all.destroy_all
Art.all.destroy_all
Category.all.destroy_all
Game.all.destroy_all

lawrence = User.create(name: "Lawrence")
aruna = User.create(name: "Aruna")

puts "----SEEDED USERS-----"

dog = Category.create(name: "Dog")
cat = Category.create(name: "Cat")
house = Category.create(name: "House")
rocket = Category.create(name: "Rocket")
baloon = Category.create(name: "Baloon")
xmastree = Category.create(name: "Xmas Tree")
cabbage = Category.create(name: "Cabbage")


puts "----SEEDED CATEGORY-----"