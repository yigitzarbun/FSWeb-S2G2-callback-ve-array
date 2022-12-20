const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const dunyaKupasiFinali2014 = fifaData.filter(finaliAl);

function finaliAl(mac) {
  return mac["Year"] === 2014 && mac["Stage"] === "Final";
}

console.log(dunyaKupasiFinali2014);

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

let evSahibi = dunyaKupasiFinali2014[0]["Home Team Name"];
console.log(evSahibi);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

/*
function Finaller(fifaVerileri) {
	let finallerDizisi = [];

	for (let i=0; i < fifaVerileri.length; i ++){
		if (fifaVerileri[i].Stage === 'Final'){
			finallerDizisi.push(fifaVerileri[i]);
		}
	}
	return finallerDizisi;
};
console.log(Finaller(fifaData)); */

// yigit not: yukarıdaki for ve if kullanan yöntem. aşağıdaki ise filter kullanan yöntem.

function Finaller(fifaVerileri) {
  let finallerDizisi = fifaVerileri.filter((mac) => {
    return mac.Stage === "Final";
  });
  return finallerDizisi;
}
console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaVerileri, callback) {
  let years = callback(fifaVerileri).map((mac) => {
    return mac.Year;
  });
  return years;
}
console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

// yigit not: bu soruyu filter ile denedim fakat kazanan takımı belirleyemedim.

function Kazananlar(fifaVerileri, callback) {
  let kazananTakimlar = [];
  let finaller = callback(fifaVerileri);
  for (let i = 0; i < finaller.length; i++) {
    if (finaller[i]["Home Team Goals"] > finaller[i]["Away Team Goals"]) {
      kazananTakimlar.push(finaller[i]["Home Team Name"]);
    } else {
      kazananTakimlar.push(finaller[i]["Away Team Name"]);
    }
  }
  return kazananTakimlar;
}
console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(
  fifaVerileri,
  finallerCallback,
  yillarCallback,
  kazananlarCallback
) {
  let kazananlarListesi = finallerCallback(fifaVerileri).map((mac, i) => {
    return (
      yillarCallback(fifaVerileri, finallerCallback)[i] +
      " yılında, " +
      kazananlarCallback(fifaVerileri, finallerCallback)[i] +
      " dünya kupasını kazandı!"
    );
  });
  return kazananlarListesi;
}

console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finaller) {
  const totalGoals = finaller.reduce(
    (total, match) =>
      total + match["Home Team Goals"] + match["Away Team Goals"],
    0
  );

  return (totalGoals / finaller.length).toFixed(2);
}

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, initial) {
  let finalTakimlarList = Kazananlar(fifaData, Finaller).slice();
  let finalTakimlarKazanmaSayilari = {};
  let initialList = {};
  let returnListe = {};
  let result = {};

  for (let i = 0; i < finalTakimlarList.length; i++) {
    if (finalTakimlarList[i] in finalTakimlarKazanmaSayilari) {
      finalTakimlarKazanmaSayilari[finalTakimlarList[i]] += 1;
    } else {
      finalTakimlarKazanmaSayilari[finalTakimlarList[i]] = 1;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Home Team Name"] in initialList === false) {
      initialList[data[i]["Home Team Name"]] = data[i]["Home Team Initials"];
    } else if (data[i]["Away Team Name"] in initialList === false) {
      initialList[data[i]["Away Team Name"]] = data[i]["Away Team Initials"];
    }
  }

  for (const key in finalTakimlarKazanmaSayilari) {
    returnListe[initialList[key]] = finalTakimlarKazanmaSayilari[key];
  }

  result = initial + ": " + returnListe[initial];
  return result;
}
console.log(UlkelerinKazanmaSayilari(fifaData, "ITA"));

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  let finalOynayanTakimlar = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Stage"] === "Final") {
      finalOynayanTakimlar[data[i]["Home Team Name"]] = 0;
      finalOynayanTakimlar[data[i]["Away Team Name"]] = 0;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Stage"] === "Final") {
      finalOynayanTakimlar[data[i]["Home Team Name"]] +=
        data[i]["Home Team Goals"];
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Stage"] === "Final") {
      finalOynayanTakimlar[data[i]["Away Team Name"]] +=
        data[i]["Away Team Goals"];
    }
  }
  let enCokGolAtanTakimAdi = Object.keys(finalOynayanTakimlar)[0];

  for (let i = 0; i < Object.keys(finalOynayanTakimlar).length; i++) {
    if (
      finalOynayanTakimlar[Object.keys(finalOynayanTakimlar)[i]] >
      finalOynayanTakimlar[enCokGolAtanTakimAdi]
    ) {
      enCokGolAtanTakimAdi = Object.keys(finalOynayanTakimlar)[i];
    }
  }

  let result =
    enCokGolAtanTakimAdi + ": " + finalOynayanTakimlar[enCokGolAtanTakimAdi];
  return result;
}
console.log(EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  let finalOynayanTakimlar = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Stage"] === "Final") {
      finalOynayanTakimlar[data[i]["Home Team Name"]] = 0;
      finalOynayanTakimlar[data[i]["Away Team Name"]] = 0;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Stage"] === "Final") {
      finalOynayanTakimlar[data[i]["Home Team Name"]] +=
        data[i]["Away Team Goals"];
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i]["Stage"] === "Final") {
      finalOynayanTakimlar[data[i]["Away Team Name"]] +=
        data[i]["Home Team Goals"];
    }
  }
  let enCokGolYiyenTakimAdi = Object.keys(finalOynayanTakimlar)[0];

  for (let i = 0; i < Object.keys(finalOynayanTakimlar).length; i++) {
    if (
      finalOynayanTakimlar[Object.keys(finalOynayanTakimlar)[i]] >
      finalOynayanTakimlar[enCokGolYiyenTakimAdi]
    ) {
      enCokGolYiyenTakimAdi = Object.keys(finalOynayanTakimlar)[i];
    }
  }

  let result =
    enCokGolYiyenTakimAdi + ": " + finalOynayanTakimlar[enCokGolYiyenTakimAdi];
  return finalOynayanTakimlar;
}

console.log(EnKotuDefans(fifaData));

console.log("aaaa");
/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

// Ülke kısaltmalarını parametre olarak alan ve dünya kupasında yer alma sayılarını dönünen bir fonksiyon yaratabilirsiniz.

console.log("bonus 4");

function kacDefaKatildi(data, teamInitial) {
  let resultArray = [];
  let result = 0;

  for (let i = 0; i < data.length; i++) {
    if (
      data[i]["Home Team Initials"] === teamInitial ||
      data[i]["Away Team Initials"] === teamInitial
    ) {
      if (resultArray.includes(data[i]["Year"]) === false) {
        resultArray.push(data[i]["Year"]);
      }
    }
  }

  result = resultArray.length;
  return result;
}

console.log(kacDefaKatildi(fifaData, "ITA"));

console.log("bonus 5");

// Ülke kısaltmalarını parametre olarak alan ve dünya kupasında attıkları gol sayılarını(1930 sonrası) dönen bir fonksiyon yaratabilirsiniz.

function kacGolAtti(data, initial) {
  let takimlar = {};
  let result = 0;

  for (let i = 0; i < data.length; i++) {
    takimlar[data[i]["Home Team Initials"]] = 0;
    takimlar[data[i]["Away Team Initials"]] = 0;
  }

  for (let i = 0; i < data.length; i++) {
    takimlar[data[i]["Home Team Initials"]] += data[i]["Home Team Goals"];
    takimlar[data[i]["Away Team Initials"]] += data[i]["Away Team Goals"];
  }

  result = takimlar[initial];
  return result;
}

console.log(kacGolAtti(fifaData, "TUR"));

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
