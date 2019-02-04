const test = () => {
  const response = {
    content: [{
      student_id: 112394,
      data: {
        course: 'ATM4MM-01',
        comment: '',
        assessment: {
          data: {
            0: {
              title: 'Technique Testing',
              K: {
                category: 'K',
                mark: '94',
                outOf: '100',
                weight: '4',
              },
              T: {
                category: 'T',
                mark: '93',
                outOf: '100',
                weight: '4',
              },
              C: {
                category: 'C',
                mark: '93',
                outOf: '100',
                weight: '4',
              },
              A: {
                category: 'A',
                mark: '94',
                outOf: '100',
                weight: '4',
              },
              feedback: '',
            },
            1: {
              title: 'Modern Testing',
              K: {
                category: 'K',
                mark: '92',
                outOf: '100',
                weight: '4',
              },
              T: {
                category: 'T',
                mark: '92',
                outOf: '100',
                weight: '4',
              },
              C: {
                category: 'C',
                mark: '91',
                outOf: '100',
                weight: '4',
              },
              A: {
                category: 'A',
                mark: '92',
                outOf: '100',
                weight: '4',
              },
              feedback: '',
            },
            2: {
              title: 'International Dance Assigment',
              A: {
                category: 'A',
                mark: '60',
                outOf: '60',
                weight: '3',
              },
              feedback: '',
            },
            3: {
              title: 'Anna Keranina Critique',
              K: {
                category: 'K',
                mark: '9.6',
                outOf: '10',
                weight: '3',
              },
              T: {
                category: 'T',
                mark: '9.6',
                outOf: '10',
                weight: '3',
              },
              C: {
                category: 'C',
                mark: '9.6',
                outOf: '10',
                weight: '3',
              },
              feedback: '',
            },
            4: {
              title: 'Oz Performance',
              '': {
                category: '',
                mark: '39',
                outOf: '40',
                weight: '20',
              },
              feedback: '',
            },
            5: {
              title: 'Teaching Unit',
              '': {
                category: '',
                mark: '37.7',
                outOf: '40',
                weight: '10',
              },
              feedback: '',
            },
            categories: {
              K: 0.21428571428571,
              T: 0.28571428571429,
              C: 0.21428571428571,
              A: 0.28571428571429,
              O: 0,
            },
          },
        },
      },
    }],
  };

  const cat = [0, 0, 0, 0, 0]; // K T C A O
  const catWeight = [0, 0, 0, 0, 0];
  const catExist = [false, false, false, false, false];
  const timeline = [];

  const preParse = JSON.parse(JSON.stringify(response.content[0]));
  const postParse = JSON.parse(JSON.stringify(response.content[0]));

  postParse.data.assessment = [];
  postParse.categoryMarks = [0, 0, 0, 0, 0];

  console.log(response.content[0].data);
  console.log(preParse);

  const { categories } = preParse.data.assessment.data;

  let cnt = 0;
  _.each(preParse.data.assessment.data, (k, v) => {
    if (v === 'categories') {
      postParse.categories = k;
    } else {
      const assess = k;
      if (assess.K) {
        catExist[0] = true;
        cat[0] += parseFloat(assess.K.mark) / parseFloat(assess.K.outOf) * 100 * parseFloat(assess.K.weight);
        catWeight[0] += parseFloat(assess.K.weight);
      }
      if (assess.T) {
        catExist[1] = true;
        cat[1] += parseFloat(assess.T.mark) / parseFloat(assess.T.outOf) * 100 * parseFloat(assess.T.weight);
        catWeight[1] += parseFloat(assess.T.weight);
      }
      if (assess.C) {
        catExist[2] = true;
        cat[2] += parseFloat(assess.C.mark) / parseFloat(assess.C.outOf) * 100 * parseFloat(assess.C.weight);
        catWeight[2] += parseFloat(assess.C.weight);
      }
      if (assess.A) {
        catExist[3] = true;
        cat[3] += parseFloat(assess.A.mark) / parseFloat(assess.A.outOf) * 100 * parseFloat(assess.A.weight);
        catWeight[3] += parseFloat(assess.A.weight);
        console.log(`${cat[3]} ${catWeight[3]}`);
      }
      if (assess['']) {
        catExist[4] = true;
        cat[4] += parseFloat(assess[''].mark) / parseFloat(assess[''].outOf) * 100 * parseFloat(assess[''].weight);
        catWeight[4] += parseFloat(assess[''].weight);
      }
      k.O = k['']; // transfer to Other
      delete k[''];
      let mark = 0;
      let K; let T; let C; let A; let O = 0;
      let catTotalWeight = 0;
      if (catExist[0]) {
        mark += cat[0] / catWeight[0] * categories.K;
        K = cat[0] / catWeight[0];
        catTotalWeight += categories.K;
      }
      if (catExist[1]) {
        mark += cat[1] / catWeight[1] * categories.T;
        T = cat[1] / catWeight[1];
        catTotalWeight += categories.T;
      }
      if (catExist[2]) {
        mark += cat[2] / catWeight[2] * categories.C;
        C = cat[2] / catWeight[2];
        catTotalWeight += categories.C;
      }
      if (catExist[3]) {
        mark += cat[3] / catWeight[3] * categories.A;
        A = cat[3] / catWeight[3];
        catTotalWeight += categories.A;
      }
      if (catExist[4]) {
        mark += cat[4] / catWeight[4] * categories.O;
        O = cat[4] / catWeight[4];
        catTotalWeight += categories.O;
      }
      mark /= catTotalWeight;
      timeline[cnt] = {
        mark: Math.round(mark * 100) / 100,
        K: Math.round(K * 100) / 100,
        T: Math.round(T * 100) / 100,
        C: Math.round(C * 100) / 100,
        A: Math.round(A * 100) / 100,
        O: Math.round(O * 100) / 100,
      };
      postParse.data.assessment[cnt++] = k;
    }
  });
  for (let i = 0; i < 5; i++) {
    if (cat[i] !== 0) {
      postParse.categoryMarks[i] = Math.round(cat[i] / catWeight[i] * 100) / 100;
    } else {
      postParse.categoryMarks[i] = 0;
    }
  }
  postParse.timeline = timeline;
  return postParse;
};

module.exports = test;
