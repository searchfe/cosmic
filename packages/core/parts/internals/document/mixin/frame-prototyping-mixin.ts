export default class FramePrototypingMixin implements Internal.FramePrototypingMixin {
    overflowDirection: Internal.OverflowDirection = 'NONE';
    numberOfFixedChildren: number;

    readonly overlayPositionType: Internal.OverlayPositionType;
    readonly overlayBackground: Internal.OverlayBackground;
    readonly overlayBackgroundInteraction: Internal.OverlayBackgroundInteraction;
}
