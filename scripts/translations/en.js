const en = {
    translation: {
        'menu': {
            'version': 'Version {{version}}',
            'leaderboard': {
                'title': 'Leaderboard',
                'level': 'Level',
                'sort': 'Sort',
                'name': 'Name',
                'time': 'Time',
                'steps': 'Steps',
                'code-blocks': 'Blocks',
                'date': 'Date',
                'error': 'Error loading leaderboard, try again later',
                'empty': 'Leaderboard is empty, be the first to add your score!',
            },
            'credits': {
                'title': 'Credits',
                'designer-programmer': 'Game Designer & Programmer',
                'advisors': 'Advisors',
                'graphics': 'Graphics',
                'music-sfx': 'Music & Sound Effects',
            },
            'setting': {
                'title': 'Setting',
                'volume': 'Sounds Volume',
                'fullscreen': 'Fullscreen',
                'language': 'Language',
                'reset': 'Reset Data',
                'install': 'Install',
                'installed': 'Game Installed',
                'reset-confirm': {
                    'title': 'Are you sure?',
                    'subtitle': 'All your progress will be lost.',
                    'yes': 'Reset',
                    'no': 'Cancel',
                }
            },
            'update': {
                'title': 'Update Available',
                'subtitle': 'Reload the game to update.',
                'yes': 'Reload',
                'no': 'Ignore',
            },
        },
        'level-select': {
            'title': 'Select Level',
        },
        'game': {
            'game-over': {
                'title': 'Good Job!',
                'add-leaderboard': 'Add to leaderboard?',
                'add-leaderboard-success': 'Successfully added',
                'add-leaderboard-no-name': 'You need to enter your name',
                'add-leaderboard-error': 'Error adding to leaderboard, try again later',
                'username-placeholder': 'Your name',
                'target': 'Target: {{value}}',
                'best': 'Best: {{value}}',
            },
            'pause': {
                'title': 'Paused',
                'restart': 'Restart',
                'select-level': 'Select Level',
            },
            'repeat-pop-up': {
                'title': 'Repeat for',
                'subtitle': 'times',
            },
            'if-pop-up': {
                'title': 'If',
            },
            'else-if-pop-up': {
                'title': 'Else if',
            },
            'while-pop-up': {
                'title': 'Repeat while',
            },
            'error': {
                'else-placement': 'You can\'t put Else If or Else there',
                'no-ammo': 'Your robot ran out of ammo',
                'invalid-condition': 'The condition is not valid',
                'player-died': 'Your robot is broken',
            },
            'tutorial': {
                'level-1': {
                    '0': 'Help GigaBot to enter the portal!',
                    '1': 'Drag the code block from here...',
                    '2': '...to this code area',
                    '3': 'Click this to run your code',
                    '4': 'Click this again to reset',
                    '5': 'Well done, now try to arrange the code blocks!',
                },
                'level-2': {
                    '0': 'Look, a new block!',
                    '1': 'Drag the block to this to see what it does',
                    '2': 'This question mark can also be dragged to the block that you want to see',
                },
                'level-3': {
                    '0': 'There\'s a rock in your way!',
                    '1': 'You can\'t go through a grid with a rock',
                },
                'level-4': {
                    '0': 'The portal is not open yet!',
                    '1': 'You have to collect gems with The Collect Gem Block to open the portal',
                    '2': 'The number of gems you need to collect is saved in a variable',
                    '3': 'Collect gems until this variable is 0',
                },
                'level-6': {
                    '0': 'There are more GigaBots that need your help!',
                    '1': 'You must arrange your code that can help all of them',
                    '2': 'GigaBot will run your code one by one',
                    '3': 'You can click a GigaBot to see its order, target portal, and variables',
                },
                'level-8': {
                    '0': 'Sometimes GigaBot needs to do different things depending on the condition',
                    '1': 'You can check a condition with If Block!',
                    '2': 'Find If Block and put it in the code area',
                    '3': 'Drag this Gem Expression Block...',
                    '4': '...to this code area',
                    '5': 'Click this button to close the condition pop up',
                    '6': 'You can open the condition pop up again by clicking this',
                    '7': 'Now you can arrange the code inside If Block that will only be executed if GigaBot needs to collect gems!',
                    '8': 'You can learn If Block and Gem Expression again using the question mark',
                },
            },
            'blocks': {
                'example-title': "In JavaScript, this can be written as:",
                'move': {
                    '0': {
                        'title': 'Move Command',
                        'content': 'This block makes your robot move forward.',
                        'example': 'moveForward()',
                    }
                },
                'rotate': {
                    '0': {
                        'title': 'Rotate Command',
                        'content': 'This block makes your robot rotate 90 degrees clockwise.',
                        'example': 'rotateClockwise()',
                    },
                    '1': {
                        'title': 'Rotate Command',
                        'content': 'This block makes your robot rotate 90 degrees anti-clockwise.',
                        'example': 'rotateAntiClockwise()',
                    }
                },
                'takegem': {
                    '0': {
                        'title': 'Collect Gem Command',
                        'content': 'This block makes your robot collect a gem that is in the same grid.',
                        'example': 'collectGem()',
                    },
                },
                'shoot': {
                    '0': {
                        'title': 'Shoot Command',
                        'content': 'This block makes your robot shoot in the same direction as your robot. The bullet has a range of 5 grids.',
                        'example': 'shoot()',
                    },
                },
                'if': {
                    '0': {
                        'title': 'If Command',
                        'content': 'This block will run the code inside it if the given condition is true. In this game, true value is any value other than zero (0).',
                        'example': 'if (condition) {\n    Code that will be run if the condition is true\n}',
                    },
                },
                'elseif': {
                    '0': {
                        'title': 'Else If Command',
                        'content': 'This block will run the code inside it if the given condition is true and the If or Else If block right before this block is not run. In this game, true value is any value other than zero (0). This block will be skipped if the If or Else If block before this block is run.',
                        'example': 'if (condition1) {\n    Code that will be run if the condition1 is true\n} else if (condition2) {\n    Code that will be run if the condition2 is true\n} else if (condition3) {\n    Code that will be run if the condition3 is true\n}',
                    },
                },
                'else': {
                    '0': {
                        'title': 'Else Command',
                        'content': 'This block will run the code inside it if the If or Else If block right before this block is not run. This block will be skipped if the If or Else If block before this block is run.',
                        'example': 'if (condition1) {\n    Code that will be run if the condition1 is true\n} else if (condition2) {\n    Code that will be run if the condition2 is true\n} else {\n    Code that will be run if the condition1 and condition2 are false\n}',
                    },
                },
                'repeat': {
                    '0': {
                        'title': 'For Command',
                        'content': 'This block will run the code inside it as many times as the given value. The given value must be greater than 0.',
                        'example': 'for (let i = 0; i < value; i++) {\n    code that will be run\n}',
                    },
                },
                'while': {
                    '0': {
                        'title': 'While Command',
                        'content': 'This block will run the code inside it as long as the given condition is true. In this game, true value is any value other than zero (0).',
                        'example': 'while (condition) {\n    code that will be run\n}',
                    },
                },
                'number': {
                    '0': {
                        'title': 'Number 0 Expression',
                        'content': 'This block gives you the number 0. This block can be combined with other number expressions to make a bigger number.',
                        'example': '0',
                    },
                    '1': {
                        'title': 'Number 1 Expression',
                        'content': 'This block gives you the number 1. This block can be combined with other number expressions to make a bigger number.',
                        'example': '1',
                    },
                    '2': {
                        'title': 'Number 2 Expression',
                        'content': 'This block gives you the number 2. This block can be combined with other number expressions to make a bigger number.',
                        'example': '2',
                    },
                    '3': {
                        'title': 'Number 3 Expression',
                        'content': 'This block gives you the number 3. This block can be combined with other number expressions to make a bigger number.',
                        'example': '3',
                    },
                    '4': {
                        'title': 'Number 4 Expression',
                        'content': 'This block gives you the number 4. This block can be combined with other number expressions to make a bigger number.',
                        'example': '4',
                    },
                    '5': {
                        'title': 'Number 5 Expression',
                        'content': 'This block gives you the number 5. This block can be combined with other number expressions to make a bigger number.',
                        'example': '5',
                    },
                    '6': {
                        'title': 'Number 6 Expression',
                        'content': 'This block gives you the number 6. This block can be combined with other number expressions to make a bigger number.',
                        'example': '6',
                    },
                    '7': {
                        'title': 'Number 7 Expression',
                        'content': 'This block gives you the number 7. This block can be combined with other number expressions to make a bigger number.',
                        'example': '7',
                    },
                    '8': {
                        'title': 'Number 8 Expression',
                        'content': 'This block gives you the number 8. This block can be combined with other number expressions to make a bigger number.',
                        'example': '8',
                    },
                    '9': {
                        'title': 'Number 9 Expression',
                        'content': 'This block gives you the number 9. This block can be combined with other number expressions to make a bigger number.',
                        'example': '9',
                    },
                },
                'variable': {
                    '0': {
                        'title': 'Armor Variable Expression',
                        'content': 'This block gives you the value of your robot\'s armor.',
                        'example': 'armor',
                    },
                    '1': {
                        'title': 'Bullet Variable Expression',
                        'content': 'This block gives you the value of your robot\'s bullet count.',
                        'example': 'bullet',
                    },
                    '2': {
                        'title': 'Gem Variable Expression',
                        'content': 'This block gives you the value of the number of gems that your robot need to collect.',
                        'example': 'gem',
                    },
                },
                'read': {
                    '0': {
                        'title': 'Read Left Expression',
                        'content': 'This block will give you the value of the tile on the left of your robot.',
                        'example': 'readLeft',
                    },
                    '1': {
                        'title': 'Read Up Expression',
                        'content': 'This block will give you the value of the tile above your robot.',
                        'example': 'readUp',
                    },
                    '2': {
                        'title': 'Read Right Expression',
                        'content': 'This block will give you the value of the tile on the right of your robot.',
                        'example': 'readRight',
                    },
                    '3': {
                        'title': 'Read Down Expression',
                        'content': 'This block will give you the value of the tile below your robot.',
                        'example': 'readDown',
                    },
                    '4': {
                        'title': 'Read Upper Left Expression',
                        'content': 'This block will give you the value of the tile on the upper left of your robot.',
                        'example': 'readUpperLeft',
                    },
                    '5': {
                        'title': 'Read Upper Right Expression',
                        'content': 'This block will give you the value of the tile on the upper right of your robot.',
                        'example': 'readUpperRight',
                    },
                    '6': {
                        'title': 'Read Lower Right Expression',
                        'content': 'This block will give you the value of the tile on the lower right of your robot.',
                        'example': 'readLowerRight',
                    },
                    '7': {
                        'title': 'Read Lower Left Expression',
                        'content': 'This block will give you the value of the tile on the lower left of your robot.',
                        'example': 'readLowerLeft',

                    },
                    '8': {
                        'title': 'Read Expression',
                        'content': 'This block will give you the value of the tile that your robot is standing on.',
                        'example': 'read',
                    },
                },
                'operator': {
                    '0': {
                        'title': 'Add Expression',
                        'content': 'This block will give you the result of the expression on the left added by the expression on the right of the block',
                        'example': 'expression1 + expression2',
                    },
                    '1': {
                        'title': 'Subtract Expression',
                        'content': 'This block will give you the result of the expression on the left subtracted by the expression on the right of the block',
                        'example': 'expression1 - expression2',
                    },
                    '2': {
                        'title': 'Multiply Expression',
                        'content': 'This block will give you the result of the expression on the left multiplied by the expression on the right of the block',
                        'example': 'expression1 * expression2',
                    },
                    '3': {
                        'title': 'Division Expression',
                        'content': 'This block will give the result of the expression on the left divided by the expression on the right of the block.',
                        'example': 'expression1 / expression2',
                    },
                    '4': {
                        'title': 'Modulus Expression',
                        'content': 'This block will give the remainder of the expression on the left divided by the expression on the right of the block.',
                        'example': 'expression1 % expression2',
                    },
                    '5': {
                        'title': 'Opening Parenthesis Expression',
                        'content': 'This block will group the expression between this expression and the Closing Parenthesis Expression and evaluate it first.',
                        'example': '(expression)',
                    },
                    '6': {
                        'title': 'Closing Parenthesis Expression',
                        'content': 'This block will group the expression between the Opening Parenthesis Expression and this expression and evaluate it first.',
                        'example': '(expression)',
                    },
                    '7': {
                        'title': 'Equal To Expression',
                        'content': 'This block will give a true value if the expression on the left is equal to the expression on the right of the block.',
                        'example': 'expression1 == expression2',
                    },
                    '8': {
                        'title': 'Not Equal To Expression',
                        'content': 'This block will give a true value if the expression on the left is not equal to the expression on the right of the block.',
                        'example': 'expression1 != expression2',
                    },
                    '9': {
                        'title': 'Greater Than Expression',
                        'content': 'This block will give a true value if the expression on the left is greater than the expression on the right of the block.',
                        'example': 'expression1 > expression2',
                    },
                    '10': {
                        'title': 'Greater Than or Equal To Expression',
                        'content': 'This block will give a true value if the expression on the left is greater than or equal to the expression on the right of the block.',
                        'example': 'expression1 >= expression2',
                    },
                    '11': {
                        'title': 'Less Than Expression',
                        'content': 'This block will give a true value if the expression on the left is less than the expression on the right of the block.',
                        'example': 'expression1 < expression2',
                    },
                    '12': {
                        'title': 'Less Than or Equal To Expression',
                        'content': 'This block will give a true value if the expression on the left is less than or equal to the expression on the right of the block.',
                        'example': 'expression1 <= expression2',
                    },
                    '13': {
                        'title': 'And Expression',
                        'content': 'This block will give a true value if both the expression on the left and the expression on the right of the block are true (both are true).',
                        'example': 'expression1 && expression2',
                    },
                    '14': {
                        'title': 'Or Expression',
                        'content': 'This block will give a true value if either the expression on the left or the expression on the right of the block is true (at least one is true).',
                        'example': 'expression1 || expression2',
                    },
                    '15': {
                        'title': 'Not Expression',
                        'content': 'This block will give a true value if the expression on the right of the block is false (not true) and give a false value if the expression on the right of the block is true (not false).',
                        'example': '!expression',
                    },
                },
            },
        },
    }
};

export default en;
