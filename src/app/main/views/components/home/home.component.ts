import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  attack: number = 0;
  decay: number = 0.2;
  sustain: number = 0.5;
  release: number = 1;

  volume: number = -6


  notas: any[] = [
    ["F4", "F#4", 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5'], 
    ["F3", "F#3", 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4'], 
  ]

  //create a synth and connect it to the main output (your speakers)
  // synth2 = new Tone.Synth({
  //   // envelope: {
  //   //   attack: 0,    // Tiempo en segundos desde que se presiona una tecla hasta que alcanza su volumen máximo.
  //   //   decay: 0.1,     // Tiempo en segundos desde que alcanza el volumen máximo hasta el nivel sostenido.
  //   //   sustain: 0.5,   // Nivel del volumen sostenido (porcentaje del volumen máximo).
  //   //   release: 0.1      // Tiempo en segundos desde que se suelta una tecla hasta que el sonido desaparece completamente.
  //   // },
  //   oscillator: {
  //     type: "square",
  //     // volume: -8
  //   }
  // }).toDestination();

  // Crear un PolySynth para simular un piano
  synth = new Tone.PolySynth(Tone.Synth).toDestination();

  // Crear un oscilador adicional
  // osc = new Tone.Oscillator({
    // type: "sawtooth"
  // }).toDestination();


  constructor() { }

  ngOnInit(): void {
    // Comienza el oscilador adicional al cargar el componente
    // this.osc.start();

    //attach a click listener to a play button
    document.querySelector('button')?.addEventListener('click', async () => {
	  await Tone.start()
	  console.log('audio is ready')

    // setInterval(() => console.log(Tone.now()), 1000);
    }) 

    // Comienza el transporte de Tone.js
    Tone.Transport.start();
    
    // Establece el BPM deseado
    Tone.Transport.bpm.value = 120; // Cambia a 120 BPM

    // Cambia el volumen del synth2 a +4 dB
    // this.synth2.volume.value = +4;
    // this.synth.set({
    //   // envelope: {
    //     // attack: 0
    //   // },
    //   oscillator: {
    //     type: "sawtooth"
    //   }
    // })

    this.updateEnv();
  }

  play(note: any) {
    // let now = Tone.now()
    // this.osc.start();

    // //play a middle 'C' for the duration of an 8th note
    // this.synth2.triggerAttackRelease(note, "16n");
    this.synth.triggerAttackRelease(note, "16n");

    // Agrega el oscilador adicional al PolySynth
    // this.synth2.connect(this.osc);

    // trigger the attack immediately
    // this.synth2.triggerAttack("C4", now)
    // wait one second before triggering the release
    // this.synth2.triggerRelease("C4", now + 0.1)
    // this.synth2.disconnect(this.osc);
  }

  // play2(note: any) {
  //   this.synth2.triggerAttackRelease(note, "16n")
  // }


  changeOsc(type: string) {
    switch (type) {
      case "sawtooth":
        this.synth.set({
          oscillator: {
            type: "sawtooth"
          }
        })
        break


      case "sine":
        this.synth.set({
          oscillator: {
            type: "sine"
          }
        })
        break


      case "triangle":
        this.synth.set({
          oscillator: {
            type: "triangle"
          }
        })
        break


      case "square":
        this.synth.set({
          oscillator: {
            type: "square"
          }
        })
        break
    }
  }


  updateEnv() {
    this.synth.set({
      envelope: {
        attack: this.attack,
        decay: this.decay,
        sustain: this.sustain,
        release: this.release
      }
    })
  }


  updateVolume(): void {
    this.synth.volume.value = this.volume;
  }

}
