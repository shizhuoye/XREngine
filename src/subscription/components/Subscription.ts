import SubscriptionMap from "../interfaces/SubscriptionMap"
import DataComponent from "../../common/components/DataComponent"
import { Types } from "ecsy"
import DefaultBehaviorData from "../defaults/DefaultSubscriptionData"

export default class Subscription extends DataComponent<SubscriptionMap> {}

Subscription.schema = {
  data: { type: Types.Ref, default: DefaultBehaviorData }
}


// TODO: This is the axis component, copy pattern this component
import AxisValue from "../interfaces/AxisValue"
import { Vector2, Scalar, Vector3 } from "../../common/types/NumericalTypes"
import BehaviorComponent from "../../common/components/BehaviorComponent"
import RingBuffer from "../../common/classes/RingBuffer"
import AxisData from "../interfaces/AxisData"

interface AxisProps {
  data: AxisData
  bufferSize: 10
  values: RingBuffer<AxisValue<Scalar | Vector2 | Vector3>>
}

export default class Axis extends BehaviorComponent<AxisProps, AxisData, AxisValue<Vector2>> {
  data: AxisData
  bufferSize: 10
}
