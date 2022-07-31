# use backtracking to play tictactoe
board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]

def haswon(player):
    """
    function to check if the player has won
    """
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] == player:
            return True
        if board[0][i] == board[1][i] == board[2][i] == player:
            return True
    if board[0][0] == board[1][1] == board[2][2] == player:
        return True
    if board[0][2] == board[1][1] == board[2][0] == player:
        return True
    return False

def display_board():
    """
    function to display the board
    """
    for i in range(3):
        for j in range(3):
            print(board[i][j], end=" ")
        print()
    print()

def get_available_moves():
    """
    function to get all the available moves
    """
    available_moves = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == " ":
                available_moves.append([i, j])

    return available_moves         

def score(player):
    """
    function to calculate the score of the player, to help with choosing the best move
    """
    if player == "X":
        opponent = "O"
    else:
        opponent = "X"

    if haswon(player):
        return 10
    elif haswon(opponent):
        return -10
    else:
        return 0

def minimax(turn):
    """
    minimax algorithm to play the tictactoe game
    """
    if haswon("X"):
        print("Player X wins")
        print()
        display_board()
        return 10
    elif haswon("O"):
        print("AI wins")
        print()
        display_board()
        return -10
    
    """
    set a list of scores and moves
    """
    scores = []
    moves = []

    """
    get all the available moves
    """
    available_moves = get_available_moves()

    for move in available_moves:
        """
        make the move
        """
        if turn == "player":
            board[move[0]][move[1]] = "X"
        else:
            board[move[0]][move[1]] = "O"
        """
        get the score of the move
        """

        temp = turn 

        if turn == "player":
            turn = "opponent"
        else:
            turn = "player"

        scores.append(minimax(turn))

        turn = temp
        """
        undo the move
        """
        board[move[0]][move[1]] = " "
    
    """
    get the best move
    """
    best_move = available_moves[scores.index(max(scores))]

    print("Player moves:", best_move)

    if turn == "player":
        return best_move

    """
    get the worst move
    """
    worst_move = available_moves[scores.index(min(scores))]

    print("AI moves:", worst_move)

    if turn == "opponent":
        return worst_move
    

minimax("player")