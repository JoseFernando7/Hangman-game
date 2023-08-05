import { Component, OnInit } from '@angular/core';
import { words } from 'src/app/words';
import { letter } from 'src/app/letter';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit 
{
  wordToGuess = this.getRandomWord();
  guessedLetters: Set<string> = new Set();
  lives = 6;
  letters = letter;

  img: string[] = ['assets/imgs/0lives.png', 'assets/imgs/1lives.png', 'assets/imgs/2lives.png', 'assets/imgs/3lives.png', 'assets/imgs/4lives.png', 'assets/imgs/5lives.png', 'assets/imgs/6lives.png'];

  constructor() {}

  ngOnInit() {}

  getRandomWord(): string
  {
    const randomIndex = Math.floor(Math.random() * words.length);

    return words[randomIndex].toUpperCase();
  }

  getWordToDisplay(): string 
  {
    return this.wordToGuess.split('').map((letter) => (this.guessedLetters.has(letter) ? letter : '_')).join(' ');
  }

  handleClick(letter: string)
  {
    let letterFound = false;

    if (!this.guessedLetters.has(letter))
    {
      this.guessedLetters.add(letter);

      for (let char of this.wordToGuess.split(''))
      {
        if (char === letter)
        {
          letterFound = true;
          break;
        }
      }

      if (!letterFound)
      {
        this.lives--;
      }
      
      console.log(this.lives);
    }
  }

  isGameOver(): boolean
  {
    const guessedWord = this.wordToGuess.split('').map((letter) => (this.guessedLetters.has(letter) ? letter : '_')).join('');

    return guessedWord === this.wordToGuess || this.lives === 0;
  }

  isLetterGuessed(letter: string): boolean
  {
    return this.guessedLetters.has(letter);
  }

  resetGame()
  {
    this.wordToGuess = this.getRandomWord();
    this.guessedLetters.clear();
    this.lives = 6;
  }
}
