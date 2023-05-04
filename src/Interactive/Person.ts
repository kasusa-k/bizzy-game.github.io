import {
    AbstractMesh,
    Color3,
    Mesh,
    MeshBuilder,
    PhysicsImpostor,
    Ray,
    Scene,
    SceneLoader,
    StandardMaterial,
    Vector3,
    Animation, Collider
} from "@babylonjs/core";
import {Space} from "@babylonjs/core/Maths/math.axis";

type PersonProps = {
    position: Vector3;
    scene: Scene;
}

const boxSize = 2

const forward = new Vector3(0, 0, boxSize);
const back = new Vector3(0, 0, -boxSize);
const left = new Vector3(boxSize, 0, 0);
const right = new Vector3(-boxSize, 0, 0);

const animation = new Animation(
    "myAnimation",
    "rotation.y",
    30,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE
);

const speedRationAnimation = 2

class Person {
    robot = new AbstractMesh("person");
    scene: Scene;

    constructor({position, scene}: PersonProps) {
        const boxColor = new StandardMaterial("box", scene);
        boxColor.diffuseColor = new Color3(.5, .1, .4);

        this.scene = scene;

        SceneLoader.ImportMesh(null, '/models/', 'robot.glb', this.scene, (meshArray) => {
            this.robot = meshArray[0]
            this.robot.scaling = new Vector3(.3, .3, .3)
            this.robot.rotation.y = -Math.PI / 2
            this.robot.position = position
            this.robot.checkCollisions = true;
        })
    }


    resetPosition() {
        this.robot.position.setAll(0)
    }

    async moveForward() {
        this.robot.animations = []
        animation.setKeys([{
            frame: 0,
            value: this.robot.rotation.y
        }, {
            frame: 30,
            value: -Math.PI / 2
        }])
        this.robot.animations.push(animation)
        this.scene.beginAnimation(this.robot, 0, 30, false, speedRationAnimation, () => {
            this.robot.moveWithCollisions(forward);
        })
        return Promise.resolve()
    }

    async moveBack() {
        this.robot.animations = []
        animation.setKeys([{
            frame: 0,
            value: this.robot.rotation.y
        }, {
            frame: 30,
            value: Math.PI / 2
        }])
        this.robot.animations.push(animation)
        this.scene.beginAnimation(this.robot, 0, 30, false, speedRationAnimation, () => {
            this.robot.moveWithCollisions(back);
        })
        return Promise.resolve()
    }

    async moveLeft() {
        this.robot.animations = []
        animation.setKeys([{
            frame: 0,
            value: this.robot.rotation.y
        }, {
            frame: 30,
            value: 0
        }])
        this.robot.animations.push(animation)
        this.scene.beginAnimation(this.robot, 0, 30, false, speedRationAnimation, () => {
            this.robot.moveWithCollisions(left);
        })
        return Promise.resolve()
    }

    async moveRight() {
        this.robot.animations = []
        animation.setKeys([{
            frame: 0,
            value: this.robot.rotation.y
        }, {
            frame: 30,
            value: -Math.PI
        }])
        this.robot.animations.push(animation)
        this.scene.beginAnimation(this.robot, 0, 30, false, speedRationAnimation, () => {
            this.robot.moveWithCollisions(right);
        })
        return Promise.resolve()
    }
}

export default Person;
