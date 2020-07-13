import React from 'react';
import {
    PanResponder,
    View,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    PanResponderCallbacks,
    PanResponderGestureState,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

type WindowDimensions = { width: number, height: number };

type Props = {
    edgeHitWidth?: number,
    toleranceX?: number,
    toleranceY?: number,
    menuPosition: 'left' | 'right',
    onChange: Function,
    onMove?: Function,
    onSliding?: Function,
    openMenuOffset?: number,
    hiddenMenuOffset?: number,
    disableGestures?: Function | boolean,
    animationFunction?: Function,
    onAnimationComplete?: Function,
    onStartShouldSetResponderCapture?: any,
    isOpen: boolean,
    bounceBackOnOverdraw?: boolean,
    autoClosing?: boolean
    animationStyle?: Function
    menu: JSX.Element
};

type Event = {
    nativeEvent: {
        layout: {
            width: number,
            height: number,
        },
    },
};


const deviceScreen: WindowDimensions = Dimensions.get('window');
const barrierForward: number = deviceScreen.width / 4;

const defaultProps = {
    toleranceY: 10,
    toleranceX: 10,
    edgeHitWidth: 60,
    children: null,
    menu: null,
    openMenuOffset: deviceScreen.width * (2 / 3),
    disableGestures: false,
    menuPosition: 'left',
    hiddenMenuOffset: 0,
    onMove: (n: number) => { },
    onStartShouldSetResponderCapture: () => true,
    onChange: () => { },
    onSliding: (n: number) => { },
    animationStyle: (value: Animated.Value) => ({
        transform: [{
            translateX: value,
        }],
    }),
    animationFunction: (prop: Animated.Value, value: number) => Animated.spring(prop, {
        toValue: value,
        friction: 8,
        useNativeDriver: true,
    }),
    onAnimationComplete: () => { },
    isOpen: false,
    bounceBackOnOverdraw: true,
    autoClosing: true,
};




function shouldOpenMenu(dx: number): boolean {
    return dx > barrierForward;
}

const SideMenu: React.FC<Props> = (newProps: Props) => {
    const props = { ...defaultProps, ...newProps }
    let prevLeft = 0

    const initialMenuPositionMultiplier = props.menuPosition === 'right' ? -1 : 1;
    const initialOpenOffsetMenuPercentage = props.openMenuOffset / deviceScreen.width;
    const initialHiddenMenuOffsetPercentage = props.hiddenMenuOffset / deviceScreen.width;
    const initialLeft: Animated.Value = new Animated.Value(
        props.isOpen
            ? props.openMenuOffset * initialMenuPositionMultiplier
            : props.hiddenMenuOffset,
    );
    const onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture

    const [isOpen, setIsOpen] = React.useState(!!props.isOpen)
    const [width, setWidth] = React.useState(deviceScreen.width)
    const [height, setHeight] = React.useState(deviceScreen.height)
    const [openOffsetMenuPercentage, setOpenOffsetMenuPercentage] = React.useState(initialOpenOffsetMenuPercentage)
    const [openMenuOffset, setOpenMenuOffset] = React.useState(deviceScreen.width * initialOpenOffsetMenuPercentage)
    const [hiddenMenuOffsetPercentage, setHiddenMenuOffsetPercentage] = React.useState(initialHiddenMenuOffsetPercentage)
    const [hiddenMenuOffset, setHiddenMenuOffset] = React.useState(deviceScreen.width * hiddenMenuOffsetPercentage)
    const left = React.useRef(initialLeft).current;
    let sideMenu = React.useRef(null)
    left.addListener(({ value }) => props.onSliding(Math.abs((value - hiddenMenuOffset) / (openMenuOffset - hiddenMenuOffset))));
    const [update, setUpdate] = React.useState(false)



    const onMoveShouldSetPanResponder = handleMoveShouldSetPanResponder
    const onPanResponderMove = handlePanResponderMove
    const onPanResponderRelease = handlePanResponderEnd
    const onPanResponderTerminate = handlePanResponderEnd


    const responder = PanResponder.create({

        onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease,
        onPanResponderTerminate,
    });


    React.useEffect(() => {
        if (typeof props.isOpen !== 'undefined' && isOpen !== props.isOpen && (props.autoClosing || isOpen === false)) {
            openMenu(props.isOpen);
        }
    }, [props, update])


    function onLayoutChange(e: Event) {
        const { width, height } = e.nativeEvent.layout;
        const openMenuOffset = width * openOffsetMenuPercentage;
        const hiddenMenuOffset = width * hiddenMenuOffsetPercentage;
        setWidth(width)
        setHeight(height)
        setOpenMenuOffset(openMenuOffset)
        setHiddenMenuOffset(hiddenMenuOffset)
    }

    /**
     * Get content view. This view will be rendered over menu
     * @return {React.Component}
     */
    function getContentView() {
        let overlay = null;

        if (isOpen) {
            overlay = (
                <TouchableWithoutFeedback onPress={() => openMenu(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            );
        }

        const ref = (sm: any) => (sideMenu = sm);
        const style = [
            styles.frontView,
            { width, height },
            props.animationStyle(left),
        ];

        return (
            <Animated.View
                style={style}
                //@ts-ignore
                ref={ref}
                {...responder.panHandlers}>
                {props.children}
                {overlay}
            </Animated.View>
        );
    }

    function moveLeft(offset: number) {
        const newOffset = menuPositionMultiplier() * offset;

        props
            .animationFunction(left, newOffset)
            .start(props.onAnimationComplete);

        prevLeft = newOffset;
    }

    function menuPositionMultiplier(): -1 | 1 {
        return props.menuPosition === 'right' ? -1 : 1;
    }

    function handlePanResponderMove(e: Object, gestureState: PanResponderGestureState) {
        if ((left as any).__getValue() * menuPositionMultiplier() >= 0) {
            let newLeft = prevLeft + gestureState.dx;

            if (!props.bounceBackOnOverdraw && Math.abs(newLeft) > openMenuOffset) {
                newLeft = menuPositionMultiplier() * openMenuOffset;
            }

            props.onMove(newLeft);
            left.setValue(newLeft);
        }
    }


    function handlePanResponderEnd(e: Object, gestureState: PanResponderGestureState) {
        const offsetLeft = menuPositionMultiplier() *
            ((left as any).__getValue() + gestureState.dx);

        openMenu(shouldOpenMenu(offsetLeft));
    }

    function handleMoveShouldSetPanResponder(e: any, gestureState: PanResponderGestureState): boolean {
        if (gesturesAreEnabled()) {
            const x = Math.round(Math.abs(gestureState.dx));
            const y = Math.round(Math.abs(gestureState.dy));

            const touchMoved = x > props.toleranceX && y < props.toleranceY;

            if (isOpen) {
                return touchMoved;
            }

            const withinEdgeHitWidth = props.menuPosition === 'right' ?
                gestureState.moveX > (deviceScreen.width - props.edgeHitWidth) :
                gestureState.moveX < props.edgeHitWidth;

            const swipingToOpen = menuPositionMultiplier() * gestureState.dx > 0;
            return withinEdgeHitWidth && touchMoved && swipingToOpen;
        }

        return false;
    }


    function openMenu(isOpen: boolean): void {
        moveLeft(isOpen ? openMenuOffset : hiddenMenuOffset);
        setIsOpen(isOpen)
        setUpdate(!update)
        props.onChange(isOpen);
    }

    function gesturesAreEnabled(): boolean {
        const { disableGestures } = props;

        if (typeof disableGestures === 'function') {
            return !disableGestures();
        }

        return !disableGestures;
    }

    const boundryStyle = props.menuPosition === 'right' ?
        { left: width - openMenuOffset } :
        { right: width - openMenuOffset };

    const menu = (
        <View style={[styles.menu, boundryStyle]}>
            {props.menu}
        </View>
    );



    return (
        <View
            style={styles.container}
            onLayout={onLayoutChange}
        >
            {menu}
            {getContentView()
            }
        </View >
    );
}

export default SideMenu


