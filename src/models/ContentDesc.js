const appContent = {
    analyze: {
        duration: "<h2>Duration</h2><p>Duration is the measure of how long a song is. Most songs fall between 120 and 400 second range. Here you can see the distribution of songs for your selected playlist. </p>",
        key: `<h2>Key Signature</h2>
              <p>Key signature, in musical notation, the arrangement of sharp or flat signs on particular lines and spaces of a musical staff to indicate that the corresponding notes, in every octave, are to be consistently raised (by sharps) or lowered (by flats) from their natural pitches.</p>
              <table> 
                <tr>
                    <th>Number</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th>
                </tr>
                <tr>
                    <td>Corresponding Key</td><td>C</td><td>C# Db</td><td>D</td><td>D# Eb</td><td>E</td><td>E# Fb</td><td>F</td><td>F# Gb</td><td>G</td><td>G# Ab</td><td>A</td><td>A# Bb</td>
                </tr>
              </table>`,
        timeSig: `<h2>Time Signature</h2>
                <p>Time signature, comes after the key signature on sheet music, is used to signify the beats per measure(bar) and what note should be played for those beats.<br/><br/> 
                    Ex 1. 4/4 time is played as 4 beats per bar and a quater note recieves that beat. <br/><br/>
                    EX 2. 2/2 time is played as 2 beats per bar and a half note recieves the beat. <br/><br/>
                    For spotify we only measure the top number in the Time Signature, Beats Per Measure.
                
                </p>`,
        tempo: `<h2>Tempo</h2>
                <p>Tempo is the measure of Beats Per Minute. Most songs fall between the 50 BPM to 200 BPM range. <br/><br/>
                BPM can have many different meanings. Some people pick the BPM's of their songs for specific activities. Some people pick the BPM based on Genre. An example of this is how House music often falls between 120-135 BPM. <br/><br/>
                Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/tempo.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                </p>`,
        acousticness: `<h2>Acousticness</h2>
                        <p>A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. <br/><br/>
                        Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/acousticness.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                        </p>`,
        dance: `<h2>Danceability</h2>
                <p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.<br/><br/>
                Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/danceability.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                </p>`,
        energy: `<h2>Energy</h2>
                <p>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.<br/><br/>
                Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/energy.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                </p>`,
        instrumentalness: `<h2>Instrumentalness</h2>
                            <p>Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.<br/><br/>
                            Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/instrumentalness.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                            </p>`,
        liveness: `<h2>Liveness</h2>
                  <p>Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.<br/><br/>
                  Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/liveness.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                  </p>`,
        loudness: `<h2>Loudness</h2>
                  <p>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.<br/><br/>
                  Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/liveness.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                  </p>`,
        speechiness: `<h2>Speechiness</h2>
                     <p>Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.<br/><br/>
                     Here you can see the distribution of Songs as per <a href='https://developer.spotify.com/assets/audio/liveness.png' target='_blank'>Spotify's Web API Docs</a> <i class="fa fa-arrow-right"></i>
                     </p>`,

    }
}

export default appContent;