import { useState } from "react";
import "./App.css";

// ===== DATA: PART 1 - CURRENT STAGE =====
const stageQuestions = [
  {
    id: "q1", icon: "📚", part: "Part 1", partLabel: "おうち英語の今",
    number: "Question 1",
    text: "お子さんと「おうち英語」を\n今やっていますか？",
    hint: "絵本・歌・動画・アプリなど、何でもOKです。",
    type: "yesno",
    yesLabel: "やっている", noLabel: "やっていない",
  },
  {
    id: "q2", icon: "🔄", part: "Part 1", partLabel: "おうち英語の今",
    number: "Question 2",
    text: "以前おうち英語を\nやっていた時期はありますか？",
    hint: "少しでも取り組んだことがあれば「ある」を選んでください。",
    type: "yesno",
    yesLabel: "ある", noLabel: "まったくない",
  },
  {
    id: "q3", icon: "✨", part: "Part 1", partLabel: "おうち英語の今",
    number: "Question 3",
    text: "お子さんの反応や\n手応えはどうですか？",
    hint: "一番近いものを選んでください。",
    type: "triple",
    options: [
      { id: "good", emoji: "😊", label: "楽しそうだし、成果も感じる" },
      { id: "unsure", emoji: "🤔", label: "楽しそうだけど、成果はまだわからない" },
      { id: "meh", emoji: "😐", label: "正直、いまいちハマっていない" },
    ],
  },
];

// ===== DATA: PART 2 - PERSONALITY =====
const personalityQuestions = [
  {
    id: "p1", icon: "🔍", part: "Part 2", partLabel: "あなたの性格",
    number: "Question 4",
    text: "おうち英語の情報を見つけた時\n最初にすることは？",
    hint: "直感で選んでください。",
    type: "triple",
    options: [
      { id: "safety", emoji: "📖", label: "口コミや体験談で「うちにも合うか」考える" },
      { id: "result", emoji: "📊", label: "効果があるかデータやエビデンスを調べる" },
      { id: "connect", emoji: "📱", label: "同じことをやってるママをSNSで探す" },
    ],
  },
  {
    id: "p2", icon: "💭", part: "Part 2", partLabel: "あなたの性格",
    number: "Question 5",
    text: "子どもが英語を嫌がった時\nあなたの第一反応は？",
    hint: "「やっちゃいそうなこと」で選んでください。",
    type: "triple",
    options: [
      { id: "safety", emoji: "😟", label: "やり方が間違ってるのかも...と心配になる" },
      { id: "result", emoji: "🔄", label: "別の教材やアプローチに切り替える" },
      { id: "connect", emoji: "💬", label: "同じ経験のママに相談したくなる" },
    ],
  },
  {
    id: "p3", icon: "🔑", part: "Part 2", partLabel: "あなたの性格",
    number: "Question 6",
    text: "おうち英語を続けるために\n一番大事だと思うことは？",
    hint: "",
    type: "triple",
    options: [
      { id: "safety", emoji: "🗺️", label: "正しい道筋がわかっていること" },
      { id: "result", emoji: "📈", label: "成果が目に見えること" },
      { id: "connect", emoji: "👩‍👩‍👧", label: "一緒に頑張れる仲間がいること" },
    ],
  },
  {
    id: "p4", icon: "🌟", part: "Part 2", partLabel: "あなたの性格",
    number: "Question 7",
    text: "理想のサポートは\nどれに近いですか？",
    hint: "",
    type: "triple",
    options: [
      { id: "safety", emoji: "🤗", label: "「大丈夫、このままで合ってるよ」と言ってくれる人" },
      { id: "result", emoji: "👩‍🏫", label: "「次はこれをやると効果的だよ」と教えてくれる人" },
      { id: "connect", emoji: "🙌", label: "「うちもそうだったよ！一緒にやろう」と言ってくれる人" },
    ],
  },
  {
    id: "p5", icon: "🌸", part: "Part 2", partLabel: "あなたの性格",
    number: "Question 8",
    text: "千穂のサポートに\n一番期待することは？",
    hint: "あなたに合ったご案内をお届けするために教えてください。",
    type: "triple",
    options: [
      { id: "safety", emoji: "👶", label: "うちの子に合った具体的なアドバイス" },
      { id: "result", emoji: "📊", label: "データや理論に基づいた方法論" },
      { id: "connect", emoji: "💞", label: "同じ想いのママとのつながり" },
    ],
  },
];

// ===== DATA: RESULTS =====
const stageResults = {
  layer1: {
    icon: "🌱", badge: "TYPE 1", title: "はじめの一歩タイプ",
    subtitle: "興味はあるけど、何から始めればいいの？",
    desc: "おうち英語に興味を持っているあなた。それだけで、すでに大きな一歩です。最初から完璧にやろうとしなくて大丈夫。",
    items: ["1日1曲、英語の歌をかけ流してみる", "寝る前に英語の絵本を1ページだけ", "「Good morning!」を親子の合言葉に"],
  },
  layer2: {
    icon: "🌿", badge: "TYPE 2", title: "このまま大丈夫？タイプ",
    subtitle: "やってるけど、これで合ってるのかな...",
    desc: "続けているのに不安を感じるのは「ちゃんとやりたい」という真剣さの表れ。毎日続けていること自体が、すでに大きな成果です。",
    items: ["月1回、子どもの英語反応を記録する", "他の家庭と比べるのをやめる", "同じ仲間とつながる"],
  },
  layer3: {
    icon: "🌻", badge: "TYPE 3", title: "アプローチ模索タイプ",
    subtitle: "お子さんに合うやり方を探している",
    desc: "反応がいまいちなのは、英語が嫌いなのではなくアプローチが合っていないだけ。お子さんのタイプに合わせた方法に変えるだけで変わります。",
    items: ["「座って勉強」をやめて遊びの中に英語を溶かす", "お子さんの好きなものを英語で楽しむ", "「教える」から「一緒に楽しむ」に切り替え"],
  },
  layer4: {
    icon: "🍀", badge: "TYPE 4", title: "リスタートタイプ",
    subtitle: "一度やめちゃったけど...また始められる？",
    desc: "一度やめた自分を責めないで。一度開通した回路は消えません。自転車と同じで、もう一度漕ぎ始めれば体が思い出します。",
    items: ["以前やっていたことで楽しかったことを思い出す", "止まった原因を取り除く", "今日から5分だけ再開する"],
  },
  layer5: {
    icon: "🌳", badge: "TYPE 5", title: "根っこガッチリタイプ",
    subtitle: "ここから、もっと伸ばしたい！",
    desc: "成果を実感しているあなた。ここからは英語力だけでなく「自分で選べる力」をさらに伸ばすフェーズです。",
    items: ["英検などでアウトプット力を確認", "「I」で始まる自己表現を取り入れる", "段階的に子どもに主導権を渡す"],
  },
};

const motiveProfiles = {
  safety: {
    emoji: "🛡️", name: "じっくり安心型",
    color: "#9B8ABF", bgColor: "#F3F0FF", accent: "#B8A9C9",
    tagline: "あなたに必要なのは「大丈夫だよ」の一言",
    desc: "真面目で丁寧なあなたは「間違ったやり方をしていないか」がいつも気になる。でもその真剣さこそが、お子さんの英語力を育てる最大の力です。",
    whatYouGet: "千穂が10年間の実体験から「これで大丈夫」と言える根拠を、あなた専用にお届けします。不安を一つずつ解消していきましょう。",
    ctaText: "あなた専用の「安心ロードマップ」を受け取る",
  },
  result: {
    emoji: "🎯", name: "サクサク成果型",
    color: "#2E6B8A", bgColor: "#EFF6FA", accent: "#5A9AB5",
    tagline: "あなたに必要なのは「最短ルートの地図」",
    desc: "効率を大切にするあなたは、漠然と続けるのが苦手。でもその合理性があれば、正しい設計図さえあれば驚くほどの成果を出せます。",
    whatYouGet: "「毎日10分で英検準1級」の実績データと年齢別マイルストーンを体系的にお届けします。ロジックで納得できる方法論です。",
    ctaText: "データで見る「成果ロードマップ」を受け取る",
  },
  connect: {
    emoji: "🤝", name: "わいわい共感型",
    color: "#C4836A", bgColor: "#FFF5F0", accent: "#D4976A",
    tagline: "あなたに必要なのは「一緒に走る仲間」",
    desc: "おうち英語は孤独な戦い。「これでいいのかな」を一人で抱え込んでいませんか？同じ想いのママとつながるだけで、続ける力が何倍にもなります。",
    whatYouGet: "キズナClubのママたちの声や日々の小さな成功体験をシェアする場をご案内します。一人じゃないと感じられる環境を。",
    ctaText: "仲間と一緒に始める「キズナプログラム」を見る",
  },
};

// ===== LOGIC =====
function determineStage(answers) {
  if (answers.q1 === "yes") {
    if (answers.q3 === "good") return "layer5";
    if (answers.q3 === "unsure") return "layer2";
    return "layer3";
  }
  return answers.q2 === "yes" ? "layer4" : "layer1";
}

function determineMotive(scores, lastAnswer) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === sorted[1][1]) return lastAnswer;
  return sorted[0][0];
}

// ===== COMPONENTS =====

function ProgressBar({ step, total, label }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="progress">
      <div className="progress__track">
        <div className="progress__fill" style={{ width: pct + "%" }} />
      </div>
      <div className="progress__labels">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="card card--animate">
      {children}
    </div>
  );
}

function PartBadge({ label }) {
  return <div className="part-badge">{label}</div>;
}

function YesNoQ({ q, onAnswer }) {
  return (
    <Card>
      <div className="question">
        <PartBadge label={q.partLabel} />
        <div className="question__icon">{q.icon}</div>
        <div className="question__number">{q.number}</div>
        <div className="question__text">{q.text}</div>
        {q.hint && <div className="question__hint">{q.hint}</div>}
        <div className="btn-row">
          <button className="btn btn--primary" onClick={() => onAnswer("yes")}>
            {q.yesLabel}
          </button>
          <button className="btn btn--secondary" onClick={() => onAnswer("no")}>
            {q.noLabel}
          </button>
        </div>
      </div>
    </Card>
  );
}

function TripleQ({ q, onAnswer }) {
  return (
    <Card>
      <div className="question">
        <PartBadge label={q.partLabel} />
        <div className="question__icon">{q.icon}</div>
        <div className="question__number">{q.number}</div>
        <div className="question__text">{q.text}</div>
        {q.hint && <div className="question__hint question__hint--small">{q.hint}</div>}
        <div className="option-list">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              className="option-btn"
              onClick={() => onAnswer(opt.id)}
            >
              <span className="option-btn__emoji">{opt.emoji}</span>
              <span className="option-btn__label">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

function TransitionCard({ onContinue }) {
  return (
    <Card>
      <div className="question">
        <div className="transition__icon">🌿</div>
        <h2 className="transition__title">ありがとうございます！</h2>
        <p className="transition__desc">
          おうち英語の「今」がわかりました。<br />
          次は、あなたに合ったサポートスタイルを<br />見つけるための質問です。
        </p>
        <div className="transition__note">
          あと5問だけ。直感で選ぶだけでOKです 🌸
        </div>
        <button className="btn btn--primary btn--full" onClick={onContinue}>
          あなたの性格タイプを診断する →
        </button>
      </div>
    </Card>
  );
}

function FinalResult({ stage, motive, onRestart }) {
  const sr = stageResults[stage];
  const mr = motiveProfiles[motive];
  return (
    <>
      <Card>
        <div style={{ textAlign: "center" }}>
          {/* Stage Result */}
          <div className="result-icon">{sr.icon}</div>
          <div className="badge">{sr.badge}</div>
          <h2 className="result-title">{sr.title}</h2>
          <p className="result-subtitle">{sr.subtitle}</p>
          <p className="result-desc">{sr.desc}</p>

          <div className="steps-box">
            <div className="steps-box__label">あなたの最初のステップ</div>
            {sr.items.map((item, i) => (
              <div key={i} className="steps-box__item">
                <span className="steps-box__check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* Motive Result */}
          <div
            className="profile-card"
            style={{
              background: mr.bgColor,
              border: `1px solid ${mr.color}18`,
            }}
          >
            <div className="profile-card__header">
              <span className="profile-card__emoji">{mr.emoji}</span>
              <div>
                <div className="profile-card__label" style={{ color: mr.color }}>
                  あなたのサポートスタイル
                </div>
                <div className="profile-card__name">{mr.name}</div>
              </div>
            </div>
            <p className="profile-card__tagline" style={{ color: mr.color }}>
              {mr.tagline}
            </p>
            <p className="profile-card__desc">{mr.desc}</p>
            <div
              className="profile-card__what"
              style={{ border: `1px solid ${mr.color}12` }}
            >
              <div className="profile-card__what-label" style={{ color: mr.color }}>
                あなたに届くもの
              </div>
              <p className="profile-card__what-text">{mr.whatYouGet}</p>
            </div>
          </div>

          {/* CTA */}
          <button
            className="btn--cta"
            style={{
              background: `linear-gradient(135deg, ${mr.color}, ${mr.color}CC)`,
              boxShadow: `0 4px 14px ${mr.color}28`,
            }}
            onClick={() =>
              alert(
                `📥 PDFダウンロード\n\nUTAGEタグ:\nstage=${stage}\nmotive=${motive}\n\nここにPDFのURLを設定してください`
              )
            }
          >
            📥 {mr.ctaText}
          </button>

          <div className="cta-note">
            あなた専用のPDFロードマップを無料でお届けします
          </div>
        </div>
      </Card>

      {/* Dev info */}
      <div className="dev-tags">
        <span className="dev-tags__label">UTAGEタグ（開発用）</span>
        <br />
        <span className="dev-tags__code">stage: {stage} / motive: {motive}</span>
      </div>

      <div className="restart-area">
        <button className="btn--restart" onClick={onRestart}>
          もう一度診断する
        </button>
      </div>
    </>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [phase, setPhase] = useState("start");
  const [stageStep, setStageStep] = useState(0);
  const [persStep, setPersStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stage, setStage] = useState(null);
  const [motiveScores, setMotiveScores] = useState({ safety: 0, result: 0, connect: 0 });
  const [lastMotiveAns, setLastMotiveAns] = useState(null);
  const [motive, setMotive] = useState(null);

  const totalSteps = 8;
  let currentStep = 0;
  if (phase === "start") currentStep = 0;
  else if (phase === "stage") {
    if (stageStep === 0) currentStep = 1;
    else if (stageStep === 1) currentStep = 2;
    else currentStep = 3;
  }
  else if (phase === "transition") currentStep = 3;
  else if (phase === "personality") currentStep = 4 + persStep;
  else currentStep = 8;

  const progressLabel =
    phase === "start" ? "スタート" :
      phase === "result" ? "診断完了！" :
        `質問 ${currentStep} / ${totalSteps}`;

  function handleStageAnswer(val) {
    const q = stageQuestions[stageStep];
    const newAns = { ...answers, [q.id]: val };
    setAnswers(newAns);

    if (q.id === "q1" && val === "yes") {
      setStageStep(2); // skip to q3
    } else if (q.id === "q1" && val === "no") {
      setStageStep(1); // go to q2
    } else if (q.id === "q2") {
      setStage(determineStage(newAns));
      setPhase("transition");
    } else if (q.id === "q3") {
      setStage(determineStage(newAns));
      setPhase("transition");
    }
  }

  function handlePersAnswer(val) {
    const newScores = { ...motiveScores, [val]: motiveScores[val] + 1 };
    setMotiveScores(newScores);
    setLastMotiveAns(val);

    if (persStep < personalityQuestions.length - 1) {
      setPersStep(persStep + 1);
    } else {
      const m = determineMotive(newScores, val);
      setMotive(m);
      setPhase("result");
    }
  }

  function restart() {
    setPhase("start");
    setStageStep(0);
    setPersStep(0);
    setAnswers({});
    setStage(null);
    setMotiveScores({ safety: 0, result: 0, connect: 0 });
    setLastMotiveAns(null);
    setMotive(null);
  }

  const currentQ_stage = stageQuestions[stageStep];
  const currentQ_pers = personalityQuestions[persStep];

  return (
    <div className="page-bg">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header__brand">おうち英語キズナCLUB</div>
          <h1 className="header__title">
            {phase === "result"
              ? "あなたの診断結果"
              : <>あなたの<span>「タイプ」</span>を<br />診断しましょう</>
            }
          </h1>
          <p className="header__sub">
            {phase === "result"
              ? "おうち英語の現在地 × あなたの性格タイプ"
              : "8つの質問に答えるだけ。正解も不正解もありません。"
            }
          </p>
        </div>

        <ProgressBar step={currentStep} total={totalSteps} label={progressLabel} />

        {/* Start Screen */}
        {phase === "start" && (
          <Card>
            <div className="question">
              <div className="start-icon">🌱</div>
              <div className="start-title">
                おうち英語、<br />あなたに合った方法は？
              </div>
              <div className="start-desc">
                8つの質問であなたの「今の立ち位置」と<br />
                「あなたに合ったサポートスタイル」がわかります。
              </div>
              <button
                className="btn btn--primary btn--full"
                onClick={() => { setPhase("stage"); setStageStep(0); }}
              >
                診断スタート
              </button>
            </div>
          </Card>
        )}

        {/* Stage Questions */}
        {phase === "stage" && currentQ_stage && (
          currentQ_stage.type === "yesno"
            ? <YesNoQ key={currentQ_stage.id} q={currentQ_stage} onAnswer={handleStageAnswer} />
            : <TripleQ key={currentQ_stage.id} q={currentQ_stage} onAnswer={handleStageAnswer} />
        )}

        {/* Transition */}
        {phase === "transition" && (
          <TransitionCard onContinue={() => { setPhase("personality"); setPersStep(0); }} />
        )}

        {/* Personality Questions */}
        {phase === "personality" && currentQ_pers && (
          <TripleQ key={currentQ_pers.id} q={currentQ_pers} onAnswer={handlePersAnswer} />
        )}

        {/* Final Result */}
        {phase === "result" && stage && motive && (
          <FinalResult stage={stage} motive={motive} onRestart={restart} />
        )}

        {/* Footer */}
        <div className="footer">おうち英語キズナCLUB by Chiho</div>
      </div>
    </div>
  );
}
