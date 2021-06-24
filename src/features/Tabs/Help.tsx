import React from "react"
import Collapsable from "../utils/generic/UI/Collapsable"
import "./help.scss"
export const Help = (props) => {
  return (
    <div className="help">
      <h3>How to use:</h3>
      <p>1. Import a runeterra deckcode.</p>
      <p>

      2. In the <b>Mulligan</b> tab, define how you would mulligan the matchup you're trying to simulate by
      selecting a card, picking how you would like to
      mulligan it and under which circumstances. You
      may add any number of mulligan rules to a card. For example, you may add a
      rule to throw Aurelion Sol when it shows up in your starting hand, and a
      rule to keep it if Targon's Peak is also in the hand. 
      </p><p>

      3. In the counters
      tab, you will specify which cards you want to keep track of during the
      simulation. There are 5 different types of counters:
      </p>
      <Collapsable name="Sequence Counters" openedByDefault={false}>
        Sequence counters will count how many time a particular sequence of
        cards is drawn in the order that you specify it. You can use this, for
        example, to count how many times you'll draw your four drop into your
        five drop off the top. This will count a hit when you draw a specific
        group of a cards in a set order.
      </Collapsable>
      <Collapsable name="Group Counters" openedByDefault={false}>
        Group counters will count how many times you end up with a particular
        set of cards by the turn you specify it, no matter the order in which
        you draw them. You can use this, for example, to count how many hands
        you'll have drawn your four card combo by turn 4. This will count a hit
        when you draw a specific group of a cards in a any order.
      </Collapsable>
      <Collapsable name="Exclusive Counters" openedByDefault={false}>
        Exclusive counters will count how many hands you draw where your
        specified cards are not together. You can use this if you want to know
        how often you will draw either Atrocity or They Who Endure without
        drawing the other by a specified turn. This will count a hit when you
        don't draw a specific group of a cards.
      </Collapsable>
      <Collapsable
        name="Keyword Counters"
        openedByDefault={false}>
        Keyword counters will count how many time you will draw <b>any</b> card
        with the specified keyword by the selected turn. You can use this one to
        know how many hands will have access to a lifesteal unit or an elusive
        unit. This will count a hit when you draw any card with the keyword.
      </Collapsable>
      <Collapsable name="'Any' Counters" openedByDefault={false}>
        Finally, 'any' counters will count how many times you draw <b>any</b> of the
        cards you ask it to. If you select five targets, a hand that draws any
        of them by themselves will count as much as a hand that draws them all.
        You can use this one to count, for example, any hands that draw either
        Fiora, Entreat or Sparklefy by turn 3 to get an idea of how many times
        you'll have a playable unit in a Fiora buff deck. This will count a hit
        when you draw any of the specified cards.
      </Collapsable>
      4. Once you have your mulligan strategy and your counters in place, select
      a number of games to simulate. The limit per calculation is 100.000 (one
      hudred thousand) games. It might take a few seconds to run the simulation.
      Once it's done, a list of your counters will let you know how many hands
      they each hit.
    </div>
  )
}
