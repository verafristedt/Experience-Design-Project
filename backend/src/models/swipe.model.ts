import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Image} from './image.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Swipe extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  appWidth: number;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawTime: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  rawX: number[];

  @belongsTo(() => Image)
  imageId: string;

  @belongsTo(() => User)
  userId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Swipe>) {
    super(data);
  }

  get averageSpeed() {
	// Computes the total distance the finger travels and divides 
	// it by the total time from first touch to release
    let distanceTravelled = 0;
	let rawXLength = this.rawX.length;
	for (let i = 1; i < rawXLength; i++) {
		distanceTravelled += Math.abs(this.rawX[i] - this.rawX[i-1]);
	}
	let swipeTime = this.rawTime[this.rawTime.length-1] - this.rawTime[0];
	
	let averageSpeed = distanceTravelled/swipeTime;
	return averageSpeed;
  }
}

export interface SwipeRelations {
  // describe navigational properties here
}

export type SwipeWithRelations = Swipe & SwipeRelations;
