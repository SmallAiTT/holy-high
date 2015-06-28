/**
 * Created by SmallAiTT on 2015/6/27.
 */
interface Path2D{
    /**
     * Adds a path to the current path.
     *
     * @param path          A Path2D path to add.
     * @param transform     An SVGMatrix to be used as the transformation matrix for the path that is added.
     */
    addPath(path:Path2D, transform?:any);

    /**
     * Causes the point of the pen to move back to the start of the current sub-path.
     * It tries to draw a straight line from the current point to the start.
     * If the shape has already been closed or has only one point, this function does nothing.
     */
    closePath();

    /**
     * Moves the starting point of a new sub-path to the (x, y) coordinates.
     *
     * @param x The x axis of the point.
     * @param y The y axis of the point.
     */
    moveTo(x:number, y:number);

    /**
     * Connects the last point in the subpath to the x, y coordinates with a straight line.
     *
     * @param x The x axis of the coordinate for the end of the line.
     * @param y The y axis of the coordinate for the end of the line.
     */
    lineTo(x:number, y:number);

    /**
     * Adds a cubic Bézier curve to the path.
     * It requires three points.
     * The first two points are control points and the third one is the end point.
     * The starting point is the last point in the current path,
     * which can be changed using moveTo() before creating the Bézier curve.
     *
     * @param cp1x  The x axis of the coordinate for the first control point.
     * @param cp1y  The y axis of the coordinate for first control point.
     * @param cp2x  The x axis of the coordinate for the second control point.
     * @param cp2y  The y axis of the coordinate for the second control point.
     * @param x     The x axis of the coordinate for the end point.
     * @param y     The y axis of the coordinate for the end point.
     */
    bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number);

    /**
     * Adds a quadratic Bézier curve to the current path.
     *
     * @param cpx   The x axis of the coordinate for the control point.
     * @param cpy   The y axis of the coordinate for the control point.
     * @param x     The x axis of the coordinate for the end point.
     * @param y     The y axis of the coordinate for the end point.
     */
    quadraticCurveTo(cpx:number, cpy:number, x:number, y:number);

    /**
     *
     * @param x                 The x coordinate of the arc's center.
     * @param y                 The y coordinate of the arc's center.
     * @param radius            The arc's radius.
     * @param startAngle        The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
     * @param endAngle          The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
     * @param anticlockwise     An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
     */
    arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?:boolean);

    /**
     * Adds an arc to the path with the given control points and radius,
     * connected to the previous point by a straight line.
     *
     * @param x1    The x axis of the coordinate for the first control point.
     * @param y1    The y axis of the coordinate for the first control point.
     * @param x2    The x axis of the coordinate for the second control point.
     * @param y2    The y axis of the coordinate for the second control point.
     * @param radius    The arc's radius.
     */
    arcTo(x1:number, y1:number, x2:number, y2:number, radius:number);

    /**
     * Adds an ellipse to the path which is centered at (x, y) position
     * with the radii radiusX and radiusY starting at startAngle and ending at endAngle
     * going in the given direction by anticlockwise (defaulting to clockwise).
     *
     * @param x                 The x axis of the coordinate for the ellipse's center.
     * @param y                 The y axis of the coordinate for the ellipse's center.
     * @param radiusX           The ellipse's minor-axis radius.
     * @param radiusY           The ellipse's minor-axis radius.
     * @param rotation          The rotation for this ellipse, expressed in degrees.
     * @param startAngle        The starting point, measured from the x axis, from which it will be drawn, expressed in radians.
     * @param endAngle          The end ellipse's angle to which it will be drawn, expressed in radians.
     * @param anticlockwise     An optional Boolean which, if true, draws the ellipse anticlockwise (counter-clockwise), otherwise in a clockwise direction.
     */
    ellipse(x:number, y:number, radiusX:number, radiusY:number, rotation:number, startAngle:number, endAngle:number, anticlockwise?:boolean);

    /**
     * Creates a path for a rectangle at position (x, y) with a size that is determined by width and height.
     *
     * @param x         The x axis of the coordinate for the rectangle starting point.
     * @param y         The y axis of the coordinate for the rectangle starting point.
     * @param width     The rectangle's width.
     * @param height    The rectangle's height.
     */
    rect(x:number, y:number, width:number, height:number);
}

declare var Path2D: {
    new (path?: any): Path2D;
    (path?: any): Path2D;
}


interface RenderingContext2D {
    miterLimit: number;
    font: string;
    globalCompositeOperation: string;
    msFillRule: string;
    lineCap: string;
    msImageSmoothingEnabled: boolean;
    lineDashOffset: number;
    shadowColor: string;
    lineJoin: string;
    shadowOffsetX: number;
    lineWidth: number;
    canvas: HTMLCanvasElement;
    strokeStyle: any;
    globalAlpha: number;
    shadowOffsetY: number;
    fillStyle: any;
    shadowBlur: number;
    textAlign: string;
    textBaseline: string;
    direction:string;
    restore(): void;
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    save(): void;
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    measureText(text: string): TextMetrics;
    isPointInPath(x: number, y: number, fillRule?: string): boolean;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    putImageData(imagedata: ImageData, dx: number, dy: number, dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): void;
    rotate(angle: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    translate(x: number, y: number): void;
    scale(x: number, y: number): void;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    lineTo(x: number, y: number): void;
    getLineDash(): Array<number>;
    fill(fillRule?: any): void;
    createImageData(imageDataOrSw: any, sh?: number): ImageData;
    createPattern(image: HTMLElement, repetition: string): CanvasPattern;
    closePath(): void;
    rect(x: number, y: number, w: number, h: number): void;
    clip(fillRule?: string): void;
    clearRect(x: number, y: number, w: number, h: number): void;
    moveTo(x: number, y: number): void;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    fillRect(x: number, y: number, w: number, h: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    drawImage(image: HTMLElement, offsetX: number, offsetY: number, width?: number, height?: number, canvasOffsetX?: number, canvasOffsetY?: number, canvasImageWidth?: number, canvasImageHeight?: number): void;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    stroke(path?:Path2D): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    setLineDash(segments: Array<number>): void;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    beginPath(): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
}