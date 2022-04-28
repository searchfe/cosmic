import { ref } from 'vue';
import { ConstraintType, type Constraints } from '@cosmic/core/parts';
export default class StateHelper{
    public state = ref({top: false, right: false, bottom: false, left: false, x: false, y: false});
    

    updateHelper(constraints: Constraints) {
        this.state.value.top = false;
        this.state.value.y = false;
        this.state.value.bottom = false;
        switch(constraints.vertical) {
            case ConstraintType.MIN:
                this.state.value.top = true;
                break;
            case ConstraintType.MAX:
                this.state.value.bottom = true;
                break;
            case ConstraintType.CENTER:
                this.state.value.y = true;
                break;
            case ConstraintType.STRETCH:
                this.state.value.top = true;
                this.state.value.bottom = true;
                break;
            case ConstraintType.SCALE:
                this.state.value.y = true;
                this.state.value.top = true;
                this.state.value.bottom = true;
                break;
        }

        this.state.value.left = false;
        this.state.value.x = false;
        this.state.value.right = false;
        switch(constraints.horizontal) {
            case ConstraintType.MIN:
                this.state.value.left = true;
                break;
            case ConstraintType.MAX:
                this.state.value.right = true;
                break;
            case ConstraintType.CENTER:
                this.state.value.x = true;
                break;
            case ConstraintType.STRETCH:
                this.state.value.left = true;
                this.state.value.right = true;
                break;
            case ConstraintType.SCALE:
                this.state.value.x = true;
                this.state.value.left = true;
                this.state.value.right = true;
                break;
        }
    }
}