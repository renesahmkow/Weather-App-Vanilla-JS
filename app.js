window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  )
  let temperatureDegree = document.querySelector('.degree__section-temperature')
  let locationTimezone = document.querySelector('.location__timezone')
  let degreeSection = document.querySelector('.degree__section')
  let degreeUnit = document.querySelector('.degree__section-unit')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/241a16eefc47200514db9887c3f9561d/${lat},${long}`
      fetch(api)
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data)
          const { temperature, summary, icon } = data.currently
          temperatureDegree.textContent = temperature
          temperatureDescription.textContent = summary
          locationTimezone.textContent = data.timezone

          let celcius = (temperature - 32) * (5 / 9)

          setIcons(icon, document.querySelector('.icon'))

          degreeSection.addEventListener('click', () => {
            if (degreeUnit.textContent === 'F') {
              degreeUnit.textContent = 'C'
              temperatureDegree.textContent = Math.floor(celcius)
            } else {
              degreeUnit.textContent = 'F'
              temperatureDegree.textContent = temperature
            }
          })
        })
    })
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' })
    const currentIcon = icon.replace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
  }
})
