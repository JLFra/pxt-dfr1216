// DFRobot DFR1216 - MakeCode extension for micro:bit
// Based on DFRobot's official DFRobot_UnihikerExpansion protocol.
// I2C address: 0x33
// Motor PWM period: 255

namespace DFR1216 {
    const I2C_ADDR = 0x33

    // DFRobot DFR1216 registers
    const MOTOR12_PERIOD_H = 0x00
    const MOTOR34_PERIOD_H = 0x02
    const MOTOR1_A_DUTY_H = 0x04
    const MOTOR1_B_DUTY_H = 0x06
    const MOTOR2_A_DUTY_H = 0x08
    const MOTOR2_B_DUTY_H = 0x0A
    const MOTOR3_A_DUTY_H = 0x0C
    const MOTOR3_B_DUTY_H = 0x0E
    const MOTOR4_A_DUTY_H = 0x10
    const MOTOR4_B_DUTY_H = 0x12

    let initialized = false

    function ensureInit(): void {
        if (!initialized) {
            write16(MOTOR12_PERIOD_H, 255)
            write16(MOTOR34_PERIOD_H, 255)
            initialized = true
        }
    }

    function write16(reg: number, value: number): void {
        if (value < 0) value = 0
        if (value > 65535) value = 65535
        let b = pins.createBuffer(3)
        b[0] = reg
        b[1] = (value >> 8) & 0xff
        b[2] = value & 0xff
        pins.i2cWriteBuffer(I2C_ADDR, b, false)
    }

    function motorRegisters(motor: number): number[] {
        if (motor == 1) return [MOTOR1_A_DUTY_H, MOTOR1_B_DUTY_H]
        if (motor == 2) return [MOTOR2_A_DUTY_H, MOTOR2_B_DUTY_H]
        if (motor == 3) return [MOTOR3_A_DUTY_H, MOTOR3_B_DUTY_H]
        return [MOTOR4_A_DUTY_H, MOTOR4_B_DUTY_H]
    }

    /**
     * Rotate one motor clockwise.
     * Speed is always positive: 0..255.
     */
    //% block="moteur %motor CW vitesse %speed"
    //% motor.min=1 motor.max=4 motor.defl=1
    //% speed.min=0 speed.max=255 speed.defl=100
    //% weight=100
    export function moteurCW(motor: number, speed: number): void {
        ensureInit()

        if (motor < 1) motor = 1
        if (motor > 4) motor = 4
        if (speed < 0) speed = 0
        if (speed > 255) speed = 255

        let r = motorRegisters(motor)
        write16(r[0], speed)
        write16(r[1], 0)
    }

    /**
     * Rotate one motor counter-clockwise.
     * Speed is always positive: 0..255.
     */
    //% block="moteur %motor CCW vitesse %speed"
    //% motor.min=1 motor.max=4 motor.defl=1
    //% speed.min=0 speed.max=255 speed.defl=100
    //% weight=99
    export function moteurCCW(motor: number, speed: number): void {
        ensureInit()

        if (motor < 1) motor = 1
        if (motor > 4) motor = 4
        if (speed < 0) speed = 0
        if (speed > 255) speed = 255

        let r = motorRegisters(motor)
        write16(r[0], 0)
        write16(r[1], speed)
    }

    /**
     * Stop one motor.
     */
    //% block="arrêter moteur %motor"
    //% motor.min=1 motor.max=4 motor.defl=1
    //% weight=90
    export function arreterMoteur(motor: number): void {
        ensureInit()

        if (motor < 1) motor = 1
        if (motor > 4) motor = 4

        let r = motorRegisters(motor)
        write16(r[0], 0)
        write16(r[1], 0)
    }

    /**
     * Stop all four motors.
     */
    //% block="arrêter tous les moteurs"
    //% weight=80
    export function arreterTousLesMoteurs(): void {
        ensureInit()
        for (let m = 1; m <= 4; m++) {
            let r = motorRegisters(m)
            write16(r[0], 0)
            write16(r[1], 0)
        }
    }

    /**
     * Read a digital input.
     *
     * The micro:bit pin is automatically configured with its
     * internal pull-down resistor. This is intended for a switch
     * wired between 3.3V and the selected pin:
     *   switch open  -> 0
     *   switch closed -> 1
     */
    //% block="lire entrée logique %pin"
    //% weight=70
    export function lireEntree(pin: DigitalPin): number {
        return pins.digitalReadPin(pin)
    }


    /**
     * Set pull Down digital input.
     *
     * The micro:bit pin is  configured with its
     * internal pull-down resistor. This is intended for a switch
     * wired between 3.3V and the selected pin:
     *   switch open  -> 0
     *   switch closed -> 1
     */
    //% block="fixer etat %pin bas"
    //% weight=70
    export function FixerSortie(pin: DigitalPin): number {
        pins.setPull(pin, PinPullMode.PullDown)
    }

    
    /**
     * Write a digital output.
     *
     * The pin is automatically used as a digital output.
     */
    //% block="écrire sortie logique %pin = %state"
    //% state.shadow="toggleOnOff"
    //% weight=60
    export function ecrireSortie(pin: DigitalPin, state: boolean): void {
        pins.digitalWritePin(pin, state ? 1 : 0)
    }

}
