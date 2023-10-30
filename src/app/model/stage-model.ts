import {Model} from '../../framework/model';


const obj = [
  {
    events: [
      {
        on: 'start',
        messages: [
          'aaaa',
          'bbbb'
        ],
      },
      {
        on: 'kill',
        messages: [
          'kill---'
        ]
      },
      {
        on: 'end',
        messages: [
          'aaaa',
          'bbbb'
        ]
      }
    ],
    enemies: [
      {
        spriteId: '',
        name: 'aaa',
      },
      {
        spriteId: '',
        name: 'bbb',
      },
      {
        spriteId: '',
        name: 'ccc',
      },
    ]
  }
]

export class StageModel extends Model {
  constructor() {
    super();
    Object.assign(this, obj)
  }
}
