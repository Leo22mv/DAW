import { Component, OnInit } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //create a synth and connect it to the main output (your speakers)
  synth = new Tone.Synth({
    envelope: {
      attack: 0,    // Tiempo en segundos desde que se presiona una tecla hasta que alcanza su volumen máximo.
      decay: 0.1,     // Tiempo en segundos desde que alcanza el volumen máximo hasta el nivel sostenido.
      sustain: 0.5,   // Nivel del volumen sostenido (porcentaje del volumen máximo).
      release: 0.1      // Tiempo en segundos desde que se suelta una tecla hasta que el sonido desaparece completamente.
    },
    oscillator: {
      type: "square",
      volume: -8
    }
  }).toDestination();

  // Crear un PolySynth para simular un piano
  synth2 = new Tone.PolySynth(Tone.Synth).toDestination();

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

    // Cambia el volumen del synth2 a +6 dB
    this.synth2.volume.value = +4;
    this.synth2.set({
      envelope: {
        attack: 0
      },
      oscillator: {
        type: "sine"
      }
    })
  }

  play(note: any) {
    // let now = Tone.now()
    // this.osc.start();

    // //play a middle 'C' for the duration of an 8th note
    this.synth2.triggerAttackRelease(note, "16n");
    this.synth.triggerAttackRelease(note, "16n");

    // Agrega el oscilador adicional al PolySynth
    // this.synth2.connect(this.osc);

    // trigger the attack immediately
    // this.synth2.triggerAttack("C4", now)
    // wait one second before triggering the release
    // this.synth2.triggerRelease("C4", now + 0.1)
    // this.synth2.disconnect(this.osc);
  }

  play2(note: any) {
    this.synth2.triggerAttackRelease(note, "16n")
  }

}
