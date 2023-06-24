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
                'number': {
                    '0': {
                        'title': 'Number Expression',
                        'content': 'This block gives you the number 0. This block can be combined with other number expressions to make a bigger number.',
                        'example': '0',
                    },
                    '1': {
                        'title': 'Number Expression',
                        'content': 'This block gives you the number 1. This block can be combined with other number expressions to make a bigger number.',
                        'example': '1',
                    },
                    '2': {
                        'title': 'Number Expression',
                        'content': 'This block gives you the number 2. This block can be combined with other number expressions to make a bigger number.',
                        'example': '2',
                    },
                },
            },
        },
    }
};

export default en;
