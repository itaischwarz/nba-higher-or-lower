import random
def setup_data():
  print("HELLO")
  with open("/Users/itaischwarz/Projects/player_points.csv", "r") as file:
    lines = file.readlines()
  players_to_points = {}
  for line in lines :
    number,name,points = line.split(",")
    players_to_points[name] = points
  return players_to_points
  print(len(lines))
def play_game(data):
  user_correct = True
  questions_correct = 0
  player_1 = list(data.keys())[random.randint(0, 249)]
  player_1_points = data[player_1]
  data.pop(player_1)
  while user_correct:
      user_guess = ""
      player_2 = list(data.keys())[random.randint(0, 248-questions_correct)]
      player_2_points = data[player_2]
      answer = 1
      if player_2_points > player_1_points:
        answer = 2
      data.pop(player_2)
      while user_guess != 1 and user_guess != 2:
        print(player_1)
        print(player_1_points)
        user_guess = input(f"{player_1} has {player_1_points} points, does he have more points than {player_2}?\n Type 1 if Yes, 2 if No")
        user_guess = int(user_guess.replace(" ", ""))
      if int(user_guess) == answer:
        player_1 = player_2
        player_1_points = player_2_points
        questions_correct += 1
      else:
        print(f"Wrong, {player_2} has {player_2_points} points\n You got {questions_correct} questions correct")
        user_correct = False




players_to_points = setup_data()
play_game(players_to_points)

