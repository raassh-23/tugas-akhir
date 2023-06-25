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
                'level-9': {
                    '0': 'Be careful! There are spikes that can damage GigaBot\'s armor',
                    '1': 'If GigaBot\'s armor is 0, GigaBot will be broken',
                    '2': 'GigaBot\'s armor value is saved in a variable and you can use it for blocks that need a condition',
                },
                'level-10': {
                    '0': 'A grid can contain a number',
                    '1': 'You can use the number in a grid in a condition by using Read Block',
                    '2': 'Remember! You can get code block\'s explanation by using the question mark',
                },
                'level-11': {
                    '0': 'Besides using the number from the same grid, you can also use the number around GigaBot',
                    '1': 'Use the question mark to see the explanation of the new Read Blocks!',
                },
                'level-12': {
                    '0': 'Sometimes GigaBot needs to do different things if If Block is not executed',
                    '1': 'Try to use Else Block to do that!',
                },
                'level-14': {
                    '0': 'Use Equal Block to compare values in a condition!',
                },
                'level-15': {
                    '0': 'Besides Equal Block, there are many other comparison blocks',
                    '1': 'Learn all of them by using the question mark!',
                },
                'level-17': {
                    '0': 'You can drag the screen to move your camera',
                    '1': 'Use Else If Block if you want to check more than 1 condition',
                },
                'level-19': {
                    '0': 'For Block can be used to run the same code repeatedly',
                    '1': 'You can set how many times the code is run in the same way as setting the condition of If Block',
                },
                'level-21': {
                    '0': 'There\'s another rock in front of you, but it has a different color',
                    '1': 'You can destroy that rock with Shoot Block!',
                    '2': 'But be careful, GigaBot\'s ammo is limited',
                    '3': 'The ammo is saved in a variable and you can use it in a condition',
                },
                'level-22': {
                    '0': 'You can do addition and subtraction in a condition',
                    '1': 'Pay attention to the number in the grids around GigaBot and find out how you can use them',
                },
                'level-23': {
                    '0': 'Besides addition and subtraction, you can also do multiplication, division, and modulus',
                    '1': 'Use the question mark to see the explanation of the available Operator Blocks!',
                },
                'level-24': {
                    '0': 'You can repeat codes as long as a condition is met with While Block',
                    '1': 'You can set the condition of While Block in the same way as setting the condition of If Block',
                },
                'level-25': {
                    '0': 'There\'s a slime in front of you!',
                    '1': 'Slime can reduce GigaBot\'s armor just like spikes',
                    '2': 'You can defeat slime by shooting it',
                },
            },
            'blocks': {
                'example-title': "In JavaScript, this can be written as:",
                'move': {
                    '0': {
                        'title': 'Move Command',
                        'content': 'This block makes your robot move forward.',
                        'example': '',
                    }
                },
                'rotate': {
                    '0': {
                        'title': 'Rotate Command',
                        'content': 'This block makes your robot rotate 90 degrees clockwise.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Rotate Command',
                        'content': 'This block makes your robot rotate 90 degrees anti-clockwise.',
                        'example': '',
                    }
                },
                'takegem': {
                    '0': {
                        'title': 'Collect Gem Command',
                        'content': 'This block makes your robot collect a gem that is in the same grid.',
                        'example': '',
                    },
                },
                'shoot': {
                    '0': {
                        'title': 'Shoot Command',
                        'content': 'This block makes your robot shoot in the same direction as your robot. The bullet has a range of 5 grids.',
                        'example': '',
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
                        'content': 'This Block need to be placed right after an If or another Else If Block. This block will run the code inside it if the given condition is true and the If or Else If Block before this block is not run. In this game, true value is any value other than zero (0). This block will be skipped if the If or Else If Block before this is run.',
                        'example': 'if (condition1) {\n    Code that will be run if the condition1 is true\n} else if (condition2) {\n    Code that will be run if the condition2 is true\n} else if (condition3) {\n    Code that will be run if the condition3 is true\n}',
                    },
                },
                'else': {
                    '0': {
                        'title': 'Else Command',
                        'content': 'This Block need to be placed right after an If or Else If Block. This block will run the code inside it if the If or Else If Block before this block is not run. This block will be skipped if the If or Else If Block before this is run.',
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
                        'example': '',
                    },
                    '1': {
                        'title': 'Number 1 Expression',
                        'content': 'This block gives you the number 1. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '2': {
                        'title': 'Number 2 Expression',
                        'content': 'This block gives you the number 2. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '3': {
                        'title': 'Number 3 Expression',
                        'content': 'This block gives you the number 3. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '4': {
                        'title': 'Number 4 Expression',
                        'content': 'This block gives you the number 4. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '5': {
                        'title': 'Number 5 Expression',
                        'content': 'This block gives you the number 5. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '6': {
                        'title': 'Number 6 Expression',
                        'content': 'This block gives you the number 6. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '7': {
                        'title': 'Number 7 Expression',
                        'content': 'This block gives you the number 7. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '8': {
                        'title': 'Number 8 Expression',
                        'content': 'This block gives you the number 8. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                    '9': {
                        'title': 'Number 9 Expression',
                        'content': 'This block gives you the number 9. This block can be combined with other number expressions to make a bigger number.',
                        'example': '',
                    },
                },
                'variable': {
                    '0': {
                        'title': 'Armor Variable Expression',
                        'content': 'This block gives you the value of your robot\'s armor.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Bullet Variable Expression',
                        'content': 'This block gives you the value of your robot\'s bullet count.',
                        'example': '',
                    },
                    '2': {
                        'title': 'Gem Variable Expression',
                        'content': 'This block gives you the value of the number of gems that your robot need to collect.',
                        'example': '',
                    },
                },
                'read': {
                    '0': {
                        'title': 'Read Left Expression',
                        'content': 'This block will give you the value of the tile on the left of your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '1': {
                        'title': 'Read Up Expression',
                        'content': 'This block will give you the value of the tile above your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '2': {
                        'title': 'Read Right Expression',
                        'content': 'This block will give you the value of the tile on the right of your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '3': {
                        'title': 'Read Down Expression',
                        'content': 'This block will give you the value of the tile below your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '4': {
                        'title': 'Read Upper Left Expression',
                        'content': 'This block will give you the value of the tile on the upper left of your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '5': {
                        'title': 'Read Upper Right Expression',
                        'content': 'This block will give you the value of the tile on the upper right of your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '6': {
                        'title': 'Read Lower Right Expression',
                        'content': 'This block will give you the value of the tile on the lower right of your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                    '7': {
                        'title': 'Read Lower Left Expression',
                        'content': 'This block will give you the value of the tile on the lower left of your robot. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',

                    },
                    '8': {
                        'title': 'Read Expression',
                        'content': 'This block will give you the value of the tile that your robot is standing on. If there is no number on that tile, this block will give you the value 0.',
                        'example': '',
                    },
                },
                'operator': {
                    '0': {
                        'title': 'Add Expression',
                        'content': 'This block will give you the result of the expression on the left added by the expression on the right of the block.',
                        'example': 'expression1 + expression2',
                    },
                    '1': {
                        'title': 'Subtract Expression',
                        'content': 'This block will give you the result of the expression on the left subtracted by the expression on the right of the block.',
                        'example': 'expression1 - expression2',
                    },
                    '2': {
                        'title': 'Multiply Expression',
                        'content': 'This block will give you the result of the expression on the left multiplied by the expression on the right of the block.',
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
                        'title': 'Equal Expression',
                        'content': 'This block will give a true value if the expression on the left is equal to the expression on the right of the block.',
                        'example': 'expression1 == expression2',
                    },
                    '8': {
                        'title': 'Not Equal Expression',
                        'content': 'This block will give a true value if the expression on the left is not equal to the expression on the right of the block.',
                        'example': 'expression1 != expression2',
                    },
                    '9': {
                        'title': 'Greater Than Expression',
                        'content': 'This block will give a true value if the expression on the left is greater than the expression on the right of the block.',
                        'example': 'expression1 > expression2',
                    },
                    '10': {
                        'title': 'Greater Than or Equal Expression',
                        'content': 'This block will give a true value if the expression on the left is greater than or equal to the expression on the right of the block.',
                        'example': 'expression1 >= expression2',
                    },
                    '11': {
                        'title': 'Less Than Expression',
                        'content': 'This block will give a true value if the expression on the left is less than the expression on the right of the block.',
                        'example': 'expression1 < expression2',
                    },
                    '12': {
                        'title': 'Less Than or Equal Expression',
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
